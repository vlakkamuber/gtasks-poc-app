package com.ubr.dcagapiservicejava.service;

import com.ubr.dcagapiservicejava.domain.Task;
import com.ubr.dcagapiservicejava.domain.User;
import com.ubr.dcagapiservicejava.domain.UserTask;
import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;
import com.ubr.dcagapiservicejava.dto.UserTaskDTO;
import com.ubr.dcagapiservicejava.dto.UserTaskResponse;
import com.ubr.dcagapiservicejava.dto.UserTaskSummaryResponse;
import com.ubr.dcagapiservicejava.error.TaskException;
import com.ubr.dcagapiservicejava.error.TaskNotFoundException;
import com.ubr.dcagapiservicejava.repository.TaskRepository;
import com.ubr.dcagapiservicejava.repository.UserTasksRepository;
import com.ubr.dcagapiservicejava.utils.DcagUtils;
import com.ubr.dcagapiservicejava.utils.GCPUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.apache.commons.lang3.StringUtils.isEmpty;

@Slf4j
@Service
public class UserTaskService {

    public final static Integer MILLISECOND = 1000;

    @Autowired
    private GCPUtils gcpUtils;

    @Autowired
    private UserTasksRepository userTasksRepository;

    @Autowired
    private TaskRepository taskRepository;

    public UserTaskResponse createUserTask(String userId, Long taskId, UserTaskDTO userTaskDTO) {

        if (!userTaskDTO.status().equals(UserTaskStatus.IN_PROGRESS)) {
            throw new TaskException("Task can only be created with in progress status. Task Id: " + taskId + " Status: " + userTaskDTO.status());
        }

        Optional<List<UserTask>> userTaskList = userTasksRepository.findByTaskId(taskId);

        Optional<UserTask> userIdAndTaskId = userTasksRepository.findByUserIdAndTaskId(userId, taskId);

        Optional<Task> task = taskRepository.findById(taskId);

        if (task.isPresent()) {

            if (userIdAndTaskId.isPresent()) {
                throw new TaskNotFoundException(String.format("User - %s for task - %s already exist: ", userId, task.get().name()));
            }

            if (userTaskList.isEmpty() || task.get().isAvailable()) {
                UserTaskStatus status = userTaskDTO.status();
                UserTask userTask = new UserTask()
                        .user(new User().id(userId))
                        .task(new Task().id(taskId))
                        .status(status)
                        .startTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));
                userTask = userTasksRepository.save(userTask);
                log.info("User - {} In progress task - {} created", userId, taskId);
                updateTaskStatus(taskId);

                return userTaskToBasicUserTaskResponse(userTask, task.get());
            } else {
                throw new TaskException("Task not available for user " + userId);
            }
        } else {
            throw new TaskNotFoundException("Task not found: " + taskId);
        }

    }

    public UserTaskResponse updateUserTask(String userId, Long taskId, UserTaskDTO userTaskDTO) {

        UserTaskStatus status = userTaskDTO.status();
        if (!(status.equals(UserTaskStatus.CANCELLED) || status.equals(UserTaskStatus.COMPLETED))) {
            throw new TaskException("Task can only be updated to COMPLETED. Task Id: " + taskId + " Status: " + status);
        }
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isEmpty()) {
            throw new TaskNotFoundException("Task not found: " + taskId);
        }

        Task task = taskOptional.get();
        if (!task.isAvailable()) {
            throw new TaskException("Task not available for user " + userId);
        }

        if (task.taskType().equals(TaskType.IMAGE_TO_TEXT) &&
                isEmpty(userTaskDTO.output())) {
            throw new TaskException("Output cannot be empty for IMAGE_TO_TEXT tasks");
        }

        if (task.taskType().equals(TaskType.UPLOAD_IMAGE) && userTaskDTO.taskName() != null) {
            task.name(userTaskDTO.taskName());
            taskRepository.save(task);
        }

        Optional<UserTask> userTaskOptional = userTasksRepository.findByUserIdAndTaskId(userId, taskId);
        return userTaskOptional
                .map(userTask -> {
                    UserTask updatedUserTask = new UserTask().id(userTask.id())
                            .user(userTask.user())
                            .task(userTask.task())
                            .status(status)
                            .useInputAsOutput(userTaskDTO.useInput() != null && userTaskDTO.useInput())
                            .output(userTaskDTO.output())
                            .outputDesc(userTaskDTO.outputDesc())
                            .startTime(userTask.startTime())
                            .completionTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));
                    updatedUserTask = userTasksRepository.save(updatedUserTask);

                    log.info("User - {}  task - {} status completed", userId, taskId);
                    updateTaskStatus(taskId);
                    return updatedUserTask;
                })
                .map(userTask -> userTaskToBasicUserTaskResponse(userTask, task))
                .orElseThrow(DcagUtils.userNotFound(userId));

    }

    public List<UserTaskResponse> findUserTasks(String userId, UserTaskStatus status) {

        List<UserTask> userTasks = new ArrayList<>();
        if (status == null) {
            userTasks = userTasksRepository.findByUserId(userId);
        } else {
            userTasks = userTasksRepository.findByUserIdAndStatus(userId, status);
        }

        return userTasks.stream().map(this::userTaskToUserTaskResponse).toList();
    }

    public UserTaskResponse findUserTaskById(String userId, Long taskId) {

        Optional<UserTask> userTaskOptional = userTasksRepository.findByUserIdAndTaskId(userId, taskId);
        if (userTaskOptional.isEmpty()) {
            throw new TaskNotFoundException("User not found: " + userId);
        }

        UserTask userTask = userTaskOptional.get();
        UserTaskResponse userTaskResponse = userTaskToUserTaskResponse(userTask);
        addUrlsToTaskResponse(userTaskResponse, userTask, userTask.task());
        return userTaskResponse;
    }

    public UserTaskSummaryResponse getUserTasksSummary(String userId) {

        List<UserTask> userTasks = userTasksRepository.findByUserIdAndStatus(userId, UserTaskStatus.COMPLETED);

        double totalEarning = userTasks.stream().mapToDouble(e -> e.task().price()).sum();

        LocalDate todayDate = DcagUtils.convertEpochToLocalDate(System.currentTimeMillis());

        List<UserTask> todayTasks = userTasks.stream().filter(e -> e.completionTime().equals(todayDate.atStartOfDay())
                || e.completionTime().isAfter(todayDate.atStartOfDay())).toList();

        double todayEarning = todayTasks.stream().mapToDouble(e -> e.task().price()).sum();

        UserTaskSummaryResponse.UserTaskSummaryResponseBuilder summaryResponseBuilder;
        if (!userTasks.isEmpty()) {
            summaryResponseBuilder = UserTaskSummaryResponse.builder()
                    .completedTaskCount((long) userTasks.size()).totalEarning(totalEarning)
                    .todayCompletedTasks((long) todayTasks.size()).todayEarnings(todayEarning);
        } else {
            summaryResponseBuilder = UserTaskSummaryResponse.builder()
                    .completedTaskCount(0L).totalEarning(0.0);
        }
        return summaryResponseBuilder.build();
    }

    private void updateTaskStatus(Long taskId) {

        log.info("Updating user task status for task - {}", taskId);
        Optional<List<UserTask>> userTaskList = userTasksRepository.findByTaskId(taskId);
        TaskStatus status = null;
        long completedCount = 0;
        long totalCount = 0;
        if (userTaskList.isPresent()) {

            totalCount = userTaskList.get().size();

            completedCount = userTaskList.get().stream().filter(e -> e.status().equals(UserTaskStatus.COMPLETED)).count();

            if (completedCount == 0) {
                status = TaskStatus.IN_PROGRESS;
            } else if (totalCount == completedCount) {
                status = TaskStatus.COMPLETED;
            } else {
                status = TaskStatus.COMPLETED_PARTIALLY;
            }
        }
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.status(status);
            if (totalCount == 1 && completedCount == 0) {
                task.startTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));
            }
            if (completedCount > taskOptional.get().maxNoOfUsers()) {
                task.isAvailable(false);
            }
            taskRepository.save(task);
        }

    }

    private UserTaskResponse userTaskToBasicUserTaskResponse(UserTask userTask, Task task) {
        return UserTaskResponse.builder()
                .id(userTask.id())
                .userId(userTask.user().id())
                .taskId(task.id())
                .taskName(task.name())
                .taskType(task.taskType())
                .build();
    }

    private UserTaskResponse userTaskToUserTaskResponse(UserTask userTask) {

        Task task = userTask.task();
        TaskType taskType = task.taskType();
        return UserTaskResponse.builder()
                .id(userTask.id())
                .userId(userTask.user().id())
                .taskId(task.id())
                .taskName(task.name())
                .taskType(taskType)
                .input(task.input())
                .output(userTask.output())
                .outputDesc(userTask.outputDesc())
                .currency(task.currency())
                .price(task.price())
                .createDateTime(task.createTime() != null ?
                        task.createTime().atZone(ZoneId.systemDefault()).toEpochSecond() * MILLISECOND :
                        null)
                .dueDateTime(task.dueDate() != null ?
                        task.dueDate().atZone(ZoneId.systemDefault()).toEpochSecond() * MILLISECOND :
                        null)
                .status(userTask.status())
                .useInput(userTask.useInputAsOutput())
                .startTime(userTask.startTime() != null ?
                        userTask.startTime().atZone(ZoneId.systemDefault()).toEpochSecond() * MILLISECOND :
                        null)
                .completedTime(userTask.completionTime() != null ?
                        userTask.completionTime().atZone(ZoneId.systemDefault()).toEpochSecond() * MILLISECOND :
                        null
                ).build();
    }

    private void addUrlsToTaskResponse(UserTaskResponse userTaskResponse, UserTask userTask, Task task) {
        TaskType taskType = task.taskType();
        if (taskType.equals(TaskType.RECORD_AUDIO)) {
            userTaskResponse.setInputUrl(gcpUtils.signTaskInputAudioUrl(task.input()));
        }
        if (taskType.equals(TaskType.RECEIPT_DIGITIZATION) ||
                taskType.equals(TaskType.LOCALIZATION_QUALITY) ||
                taskType.equals(TaskType.IMAGE_LABELLING) ||
                taskType.equals(TaskType.MENU_PHOTO_REVIEW)) {
            userTaskResponse.setInputUrl(gcpUtils.signTaskInputImageUrl(task.taskCategory().name().toLowerCase() + "/" + task.input()));
        }
        if (taskType.equals(TaskType.IMAGE_TO_TEXT)) {
            userTaskResponse.setInputUrl(gcpUtils.signTaskInputImageUrl(task.input()));
        }

        if (userTask.output() != null && taskType.equals(TaskType.UPLOAD_IMAGE)) {
            String outputFilename = userTask.user().id() + "_" + userTask.id() + "_" + userTask.output();
            userTaskResponse.setOutputUrl(gcpUtils.signTaskOutputImageUrl(outputFilename));
        }

        if (taskType.equals(TaskType.TEXT_TO_AUDIO) || taskType.equals(TaskType.RECORD_AUDIO)) {
            String fileNameSuffix = taskType.equals(TaskType.TEXT_TO_AUDIO) ? ".mp3" : "";
            String outputFilename = userTask.user().id() + "_" + userTask.id() + "_" + task.input() + fileNameSuffix;

            if (userTask.status().equals(UserTaskStatus.IN_PROGRESS)) {
                String uploadUrl = gcpUtils.signTaskUploadAudioUrl(outputFilename);
                userTaskResponse.setUploadUrl(uploadUrl);
            }

            if (!userTask.useInputAsOutput() && userTask.status().equals(UserTaskStatus.COMPLETED)) {
                String outputUrl = gcpUtils.signTaskOutputAudioUrl(outputFilename);
                userTaskResponse.setOutputUrl(outputUrl);
            }
        }
    }

    public void deleteUserTask(String userId, Long taskId) {

        Optional<UserTask> userTask = userTasksRepository.findByUserIdAndTaskId(userId, taskId);

        if (userTask.isPresent()) {
            userTasksRepository.deleteById(userTask.get().id());
            log.info("User - {} task - {} deleted", userId, taskId);
            updateTaskStatus(taskId);
        }

    }

    public String getUploadURL(String userId, Long taskId, String fileName) {

        Optional<UserTask> userTaskOptional = userTasksRepository.findByUserIdAndTaskId(userId, taskId);

        if (userTaskOptional.isPresent()) {

            UserTask userTask = userTaskOptional.get();

            userTask.output(fileName);

            userTasksRepository.save(userTask);

            if (userTask.status().equals(UserTaskStatus.IN_PROGRESS)) {
                String outputFilename = userTask.user().id() + "_" + userTask.id() + "_" + fileName;
                return gcpUtils.signTaskUploadImageUrl(outputFilename);
            } else {
                throw new TaskException("Task status is invalid for user: " + userId);
            }
        } else {
            throw new TaskNotFoundException("Task not found for user: " + userId);
        }

    }
}
