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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

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

        Optional<UserTask> userIdAndTaskId = userTasksRepository.findByUserIdAndTaskId(userId,taskId);

        Optional<Task> task = taskRepository.findById(taskId);

        if (task.isPresent()) {

            if(userIdAndTaskId.isPresent()){
                throw new TaskNotFoundException(String.format("User - %s for task - %s already exist: ",userId, task.get().name()));
            }

            if (userTaskList.isEmpty() || task.get().isAvailable()) {
                UserTaskStatus status = userTaskDTO.status();
                UserTask userTask = new UserTask()
                        .user(new User().id(userId))
                        .task(new Task().id(taskId))
                        .status(status)
                        .startTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));
                userTask = userTasksRepository.save(userTask);

                updateTaskStatus(taskId);

                return userTaskToUserTaskResponse(userTask);
            } else {
                throw new TaskException("Task not available for user " + userId);
            }
        } else {
            throw new TaskNotFoundException("Task not found: " + taskId);
        }

    }

    public UserTaskResponse updateUserTask(String userId, Long taskId, UserTaskDTO userTaskDTO) {

        UserTaskStatus status = userTaskDTO.status();
        if (!status.equals(UserTaskStatus.COMPLETED)) {
            throw new TaskException("Task can only be updated to COMPLETED. Task Id: " + taskId + " Status: " + status);
        }
        Optional<Task> task = taskRepository.findById(taskId);

        if(task.isPresent() && !task.get().isAvailable()) {
            throw new TaskException("Task not available for user " + userId);
        }

        Optional<UserTask> userTaskOptional = userTasksRepository.findByUserIdAndTaskId(userId, taskId);
        return userTaskOptional
                .map(userTask -> {
                    UserTask updatedUserTask = new UserTask().id(userTask.id())
                            .user(userTask.user())
                            .task(userTask.task())
                            .status(status)
                            .output(userTask.task().input())
                            .startTime(userTask.startTime())
                            .completionTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));
                    return userTasksRepository.save(updatedUserTask);
                })
                .map(this::userTaskToUserTaskResponse)
                .orElseThrow(DcagUtils.userNotFound(userId));

    }

    public List<UserTaskResponse> findUserTasks(String userId) {

        Optional<List<UserTask>> userTasks = userTasksRepository.findByUserId(userId);

        if (userTasks.isPresent()) {
            return userTasks.get().stream().map(this::userTaskToUserTaskResponse).toList();
        } else {
            throw new TaskNotFoundException("Task not found for user: " + userId);
        }
    }

    public UserTaskResponse findUserTaskById(String userId, Long taskId) {

        Optional<UserTask> userTask = userTasksRepository.findByUserIdAndTaskId(userId, taskId);
        if (userTask.isPresent()) {
            return userTaskToUserTaskResponse(userTask.get());
        } else {
            throw new TaskNotFoundException("User not found: " + userId);
        }
    }

    public UserTaskSummaryResponse getUserTasksSummary(String userId) {

        Optional<List<UserTask>> userTasks = userTasksRepository.findByUserId(userId);

        if (userTasks.isPresent()) {
            List<UserTask> userTasksList = userTasks.get().stream().filter(e -> e.status().equals(UserTaskStatus.COMPLETED)).toList();
            UserTaskSummaryResponse.UserTaskSummaryResponseBuilder summaryResponseBuilder = UserTaskSummaryResponse.builder()
                    .completedTaskCount((long) userTasksList.size()).totalEarning(userTasksList.stream().mapToDouble(e -> e.task().price()).sum());

            return summaryResponseBuilder.build();
        } else {
            UserTaskSummaryResponse.UserTaskSummaryResponseBuilder summaryResponseBuilder = UserTaskSummaryResponse.builder()
                    .completedTaskCount(0L).totalEarning(0.0);
            return summaryResponseBuilder.build();
        }
    }

    private void updateTaskStatus(Long taskId) {

        Optional<List<UserTask>> userTaskList = userTasksRepository.findByTaskId(taskId);
        TaskStatus status = null;
        long completedCount = 0;
        if (userTaskList.isPresent()) {

            long totalCount = userTaskList.get().size();

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
            if(completedCount >= taskOptional.get().maxNoOfUsers()){
                task.isAvailable(false);
            }
            taskRepository.save(task);
        }

    }

    private UserTaskResponse userTaskToUserTaskResponse(UserTask userTask) {

        Task task = userTask.task();
        UserTaskResponse.UserTaskResponseBuilder taskResponseBuilder = UserTaskResponse.builder()
                .id(userTask.id())
                .userId(userTask.user().id())
                .taskId(task.id())
                .taskName(task.name())
                .taskType(task.taskType())
                .input(task.input())
                .currency(task.currency())
                .price(task.price())
                .createDateTime(task.createTime() != null ?
                        task.createTime().atZone(ZoneId.systemDefault()).toEpochSecond() * MILLISECOND :
                        null)
                .dueDateTime(task.dueDate() != null ?
                        task.dueDate().atZone(ZoneId.systemDefault()).toEpochSecond() * MILLISECOND :
                        null)
                .status(userTask.status())
                .startTime(userTask.startTime() != null ?
                        userTask.startTime().atZone(ZoneId.systemDefault()).toEpochSecond() * MILLISECOND :
                        null)
                .completedTime(userTask.completionTime() != null ?
                        userTask.completionTime().atZone(ZoneId.systemDefault()).toEpochSecond() * MILLISECOND :
                        null
                );

        String objectName = task.taskType().equals(TaskType.AUDIO_TO_AUDIO) ? task.input() : task.input() + ".mp3";

        if (task.taskType().equals(TaskType.AUDIO_TO_AUDIO)) {
            String inputUrl = gcpUtils.generateV4GetObjectSignedUrl("dcag-tasks-input", objectName);
            taskResponseBuilder.inputUrl(inputUrl);
        }

        if (userTask.status().equals(UserTaskStatus.COMPLETED)) {
            String outputUrl = gcpUtils.generateV4GetObjectSignedUrl("dcag-tasks-output", objectName);
            taskResponseBuilder.outputUrl(outputUrl);
        }

        if (userTask.status().equals(UserTaskStatus.IN_PROGRESS)) {
            //TODO: uploadUrl is not always needed. Need to revisit this.
            String uploadUrl = gcpUtils.generateV4PutObjectSignedUrl(objectName);
            taskResponseBuilder.uploadUrl(uploadUrl);
        }


        return taskResponseBuilder.build();
    }
}