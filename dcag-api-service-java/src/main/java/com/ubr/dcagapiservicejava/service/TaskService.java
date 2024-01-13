package com.ubr.dcagapiservicejava.service;


import com.ubr.dcagapiservicejava.domain.Task;
import com.ubr.dcagapiservicejava.domain.User;
import com.ubr.dcagapiservicejava.domain.UserTask;
import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;
import com.ubr.dcagapiservicejava.dto.*;
import com.ubr.dcagapiservicejava.error.TaskException;
import com.ubr.dcagapiservicejava.error.TaskNotFoundException;
import com.ubr.dcagapiservicejava.error.UserNotFoundException;
import com.ubr.dcagapiservicejava.repository.TaskRepository;
import com.ubr.dcagapiservicejava.repository.UserTasksRepository;
import com.ubr.dcagapiservicejava.utils.GCPUtils;
import org.apache.commons.lang3.StringUtils;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import static java.util.stream.Collectors.toList;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserTasksRepository userTasksRepository;

    @Autowired
    private GCPUtils gcpUtils;

    GeometryFactory factory = new GeometryFactory();

    public List<TaskResponse> findAll() {

        return taskRepository.findAll().stream()
                .map(task -> TaskResponse.builder()
                        .id(task.id())
                        .name(task.name())
                        .taskType(task.taskType())
                        .input(task.input())
                        .status(task.status())
                        .maxNoOfUsers(task.maxNoOfUsers())
                        .currency(task.currency())
                        .price(task.price())
                        .createDateTime(task.createTime())
                        .dueDateTime(task.dueDate())
                        .build())
                .collect(toList());
    }


    public TaskResponse create(TaskDTO taskDTO) {
        Task task = new Task()
                .name(taskDTO.name())
                .taskType(taskDTO.taskType())
                .input(taskDTO.input())
                .status(TaskStatus.NEW)
                .currency(taskDTO.currency())
                .price(taskDTO.price())
                .maxNoOfUsers(taskDTO.maxNoOfUsers())
                .createTime(convertEpochToLocalDateTime(System.currentTimeMillis()))
                .dueDate(covertDateStringToLocalDateTime(taskDTO.dueDateTime()));
        Task savedTask = taskRepository.save(task);
        return TaskResponse.builder()
                .id(savedTask.id())
                .name(savedTask.name())
                .taskType(savedTask.taskType())
                .input(savedTask.input())
                .status(savedTask.status())
                .maxNoOfUsers(savedTask.maxNoOfUsers())
                .currency(savedTask.currency())
                .price(savedTask.price())
                .createDateTime(savedTask.createTime())
                .dueDateTime(savedTask.dueDate())
                .build();
    }

    public TaskResponse findById(Long taskId) {
        return taskRepository
                .findById(taskId)
                .map(this::taskToTaskResponse)
                .orElseThrow(taskNotFound(taskId));
    }

    private TaskResponse taskToTaskResponse(Task task) {
        TaskResponse.TaskResponseBuilder taskResponseBuilder = TaskResponse.builder()
                .id(task.id())
                .name(task.name())
                .taskType(task.taskType())
                .input(task.input())
                .status(task.status())
                .maxNoOfUsers(task.maxNoOfUsers())
                .currency(task.currency())
                .price(task.price())
                .createDateTime(task.createTime())
                .dueDateTime(task.dueDate());

        if (task.taskType().equals(TaskType.AUDIO_TO_AUDIO)) {
            String inputUrl = gcpUtils.generateV4GetObjectSignedUrl();
            taskResponseBuilder.inputUrl(inputUrl);
        }
        String uploadUrl = gcpUtils.generateV4PutObjectSignedUrl();
        taskResponseBuilder.uploadUrl(uploadUrl);

        return taskResponseBuilder.build();
    }

    private UserTaskResponse userTaskToUserTaskResponse(UserTask userTask) {

        Task task = userTask.task();
        UserTaskResponse.UserTaskResponseBuilder taskResponseBuilder = UserTaskResponse.builder()
                .id(userTask.id())
                .userId(userTask.user().id())
                .taskName(task.name())
                .taskType(task.taskType())
                .currency(task.currency())
                .price(task.price())
                .status(userTask.status())
                .startTime(userTask.startTime() != null ?
                        userTask.startTime().atZone(ZoneId.systemDefault()).toEpochSecond() * 1000 :
                        null)
                .completedTime(userTask.completionTime() != null ?
                        userTask.completionTime().atZone(ZoneId.systemDefault()).toEpochSecond() * 1000 :
                        null
                );

        if (task.taskType().equals(TaskType.AUDIO_TO_AUDIO)) {
            String inputUrl = gcpUtils.generateV4GetObjectSignedUrl();
            taskResponseBuilder.inputUrl(inputUrl);
        }
        if (userTask.status().equals(UserTaskStatus.IN_PROGRESS)) {
            String uploadUrl = gcpUtils.generateV4PutObjectSignedUrl();
            taskResponseBuilder.uploadUrl(uploadUrl);
        }

        if (userTask.status().equals(UserTaskStatus.COMPLETED)) {
            String outputUrl = gcpUtils.generateV4PutObjectSignedUrl();
            taskResponseBuilder.outputUrl(outputUrl);
        }

        return taskResponseBuilder.build();
    }

    public TaskResponse update(Long taskId, TaskDTO taskDTO) {

        Task task = new Task()
                .name(taskDTO.name())
                .taskType(taskDTO.taskType())
                .input(taskDTO.input())
                .status(taskDTO.status())
                .maxNoOfUsers(taskDTO.maxNoOfUsers())
                .currency(taskDTO.currency())
                .price(taskDTO.price());
//                .location(factory.createPoint(new Coordinate(taskDTO.latitude(),taskDTO.longitude(),4326)));

        return taskRepository
                .findById(taskId)
                .map(existingUser -> taskRepository.save(task))
                .map(savedTask -> TaskResponse.builder()
                        .id(savedTask.id())
                        .name(savedTask.name())
                        .taskType(savedTask.taskType())
                        .input(savedTask.input())
                        .status(savedTask.status())
                        .maxNoOfUsers(savedTask.maxNoOfUsers())
                        .currency(savedTask.currency())
                        .price(savedTask.price())
                        .build())
                .orElseThrow(taskNotFound(taskId));
    }

    public void delete(Long taskId) {
        taskRepository.findById(taskId)
                .ifPresentOrElse(taskRepository::delete,
                        () -> {
                            throw new TaskNotFoundException("User not found: " + taskId);
                        });
    }

    private Supplier<UserNotFoundException> userNotFound(String userId) {
        return () -> new UserNotFoundException("User not found: " + userId);
    }

    private Supplier<TaskNotFoundException> taskNotFound(Long taskId) {
        return () -> new TaskNotFoundException("Task not found: " + taskId);
    }

    public UserTaskResponse createUserTask(String userId, Long taskId, UserTaskDTO userTaskDTO) {

        Optional<List<UserTask>> userTaskList = userTasksRepository.findByTaskId(taskId);
        Optional<Task> task = taskRepository.findById(taskId);

        if (task.isPresent()) {

            if (userTaskList.isEmpty() || (userTaskList.get().size() < task.get().maxNoOfUsers())) {
                UserTaskStatus status = userTaskDTO.status();
                UserTask userTask = new UserTask()
                        .user(new User().id(userId))
                        .task(new Task().id(taskId))
                        .status(status);
                if (status.equals(UserTaskStatus.IN_PROGRESS)) {
                    userTask.startTime(convertEpochToLocalDateTime(System.currentTimeMillis()));
                } else if (status.equals(UserTaskStatus.COMPLETED)) {
                    userTask.completionTime(convertEpochToLocalDateTime(System.currentTimeMillis()));
                }
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

    private void updateTaskStatus(Long taskId) {

        Optional<List<UserTask>> userTaskList = userTasksRepository.findByTaskId(taskId);
        TaskStatus status = null;
        if (userTaskList.isPresent()) {

            long totalCount = userTaskList.get().size();

            long completedCount = userTaskList.get().stream().filter(e -> e.status().equals(UserTaskStatus.COMPLETED)).count();

            if (completedCount == 0) {
                status = TaskStatus.IN_PROGRESS;
            } else if (totalCount == completedCount) {
                status = TaskStatus.COMPLETED_PARTIALLY;
            } else {
                status = TaskStatus.COMPLETED;
            }
        }
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.status(status);
            taskRepository.save(task);
        }

    }

    private LocalDateTime convertEpochToLocalDateTime(Long epoch) {
        Instant instant = Instant.ofEpochMilli(epoch);
        return instant.atZone(ZoneOffset.UTC).toLocalDateTime();
    }

    private long convertLocalDateTimeToEpoch(LocalDateTime dateTime) {
        return dateTime.toEpochSecond(ZoneOffset.UTC);
    }

    private LocalDateTime covertDateStringToLocalDateTime(String dateTime) {
        if(StringUtils.isEmpty(dateTime)) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        return LocalDateTime.parse(dateTime, formatter);
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

    public UserTaskResponse updateUserTask(String userId, Long taskId, UserTaskDTO userTaskDTO) {

        UserTask userTask = new UserTask()
                .user(new User().id(userId))
                .task(new Task().id(taskId))
                .status(userTaskDTO.status())
                .startTime(convertEpochToLocalDateTime(userTaskDTO.startTime()))
                .completionTime(convertEpochToLocalDateTime(userTaskDTO.completionTime()));

        return userTasksRepository
                .findByUserId(userId)
                .map(existingUser -> userTasksRepository.save(userTask))
                .map(this::userTaskToUserTaskResponse)
                .orElseThrow(userNotFound(userId));
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

    public List<TaskResponse> findAvailableTasks(Boolean available) {

        return taskRepository.findAvailableTasks(available).stream()
                .map(task -> TaskResponse.builder()
                        .id(task.id())
                        .name(task.name())
                        .taskType(task.taskType())
                        .input(task.input())
                        .status(task.status())
                        .maxNoOfUsers(task.maxNoOfUsers())
                        .currency(task.currency())
                        .price(task.price())
                        .createDateTime(task.createTime())
                        .dueDateTime(task.dueDate())
                        .build())
                .collect(toList());
    }


//    public List<TaskResponse> findAAllNearerTasks(double latitude, double longitude, Integer distance) {
//
//        return taskRepository
//                .findAAllNearerTasks(factory.createPoint(new Coordinate(latitude,longitude,4326)),distance)
//                .stream().map(TaskResponse::new).toList();
//    }
}
