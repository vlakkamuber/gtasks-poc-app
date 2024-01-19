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
import com.ubr.dcagapiservicejava.utils.DcagUtils;
import com.ubr.dcagapiservicejava.utils.GCPUtils;
import org.apache.commons.lang3.StringUtils;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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

    public final static Integer MILLISECOND = 1000;

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
                .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()))
                .dueDate(DcagUtils.covertDateStringToLocalDateTime(taskDTO.dueDateTime()));
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
                .orElseThrow(DcagUtils.taskNotFound(taskId));
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

        /*String objectName = task.taskType().equals(TaskType.AUDIO_TO_AUDIO) ? task.input() : task.input() + ".mp3";

        if (task.taskType().equals(TaskType.AUDIO_TO_AUDIO)) {
            String inputUrl = gcpUtils.generateV4GetObjectSignedUrl("dcag-tasks-input", objectName);
            taskResponseBuilder.inputUrl(inputUrl);
        }
        if (task.status().equals(TaskStatus.IN_PROGRESS)) {
            //TODO: uploadUrl is not needed. Need to revisit this.
            String uploadUrl = gcpUtils.generateV4PutObjectSignedUrl(objectName);
            taskResponseBuilder.uploadUrl(uploadUrl);
        }*/

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
                .orElseThrow(DcagUtils.taskNotFound(taskId));
    }

    public void delete(Long taskId) {
        taskRepository.findById(taskId)
                .ifPresentOrElse(taskRepository::delete,
                        () -> {
                            throw new TaskNotFoundException("User not found: " + taskId);
                        });
    }

    public List<TaskResponse> findAvailableTasks(Boolean available, String userId) {

        return taskRepository.findAvailableTasks(available,userId).stream()
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
