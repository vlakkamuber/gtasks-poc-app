package com.ubr.dcagapiservicejava.service;


import com.ubr.dcagapiservicejava.domain.Task;
import com.ubr.dcagapiservicejava.domain.User;
import com.ubr.dcagapiservicejava.domain.UserTask;
import com.ubr.dcagapiservicejava.dto.*;
import com.ubr.dcagapiservicejava.error.TaskNotFoundException;
import com.ubr.dcagapiservicejava.error.UserNotFoundException;
import com.ubr.dcagapiservicejava.repository.TaskRepository;
import com.ubr.dcagapiservicejava.repository.UserRepository;
import com.ubr.dcagapiservicejava.repository.UserTasksRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserTasksRepository userTasksRepository;

    GeometryFactory factory = new GeometryFactory();

    public List<TaskResponse> findAll() {
        return taskRepository.findAll().stream()
                .map(TaskResponse::new)
                .collect(toList());
    }

    public TaskResponse create(TaskDTO taskDTO) {

        Task task = new Task()
                .name(taskDTO.name())
                .taskType(taskDTO.taskType())
                .input(taskDTO.input())
                .currency(taskDTO.currency())
                .price(taskDTO.price());
//                .location(factory.createPoint(new Coordinate(taskDTO.latitude(),taskDTO.longitude(),4326)));
        return new TaskResponse(taskRepository.save(task));
    }

    public TaskResponse findById(Long taskId) {
        return taskRepository
                .findById(taskId)
                .map(TaskResponse::new)
                .orElseThrow(taskNotFound(taskId));
    }

    public TaskResponse update(Long taskId, TaskDTO taskDTO) {


        Task task = new Task()
                .name(taskDTO.name())
                .taskType(taskDTO.taskType())
                .input(taskDTO.input())
                .currency(taskDTO.currency())
                .price(taskDTO.price());
//                .location(factory.createPoint(new Coordinate(taskDTO.latitude(),taskDTO.longitude(),4326)));


        return taskRepository
                .findById(taskId)
                .map(existingUser -> taskRepository.save(task))
                .map(TaskResponse::new)
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

        UserTask userTask = new UserTask()
                .user(new User().id(userId))
                .task(new Task().id(taskId))
                .status(userTaskDTO.status())
                .startTime(convertEpochToLocalDateTime(userTaskDTO.startTime()));
        return new UserTaskResponse(userTasksRepository.save(userTask));

    }

    private LocalDateTime convertEpochToLocalDateTime(Long epoch){
        Instant instant = Instant.ofEpochMilli(epoch);
        ZoneId zoneId = ZoneId.systemDefault(); // Use the system default time zone
        return instant.atZone(zoneId).toLocalDateTime();
    }

    public List<UserTaskResponse> findUserTask(String userId) {

     Optional<List<UserTask>> userTasks =  userTasksRepository.findByUserId(userId);

     if(userTasks.isPresent()){
         return userTasks.get().stream().map(UserTaskResponse::new).toList();
     }else{
         throw new TaskNotFoundException("Task not found for user: " + userId);
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
                .map(UserTaskResponse::new)
                .orElseThrow(userNotFound(userId));
    }


//    public List<TaskResponse> findAAllNearerTasks(double latitude, double longitude, Integer distance) {
//
//        return taskRepository
//                .findAAllNearerTasks(factory.createPoint(new Coordinate(latitude,longitude,4326)),distance)
//                .stream().map(TaskResponse::new).toList();
//    }
}
