package com.ubr.dcagapiservicejava.service;


import com.ubr.dcagapiservicejava.domain.Task;
import com.ubr.dcagapiservicejava.domain.User;
import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import com.ubr.dcagapiservicejava.dto.TaskDTO;
import com.ubr.dcagapiservicejava.dto.TaskResponse;
import com.ubr.dcagapiservicejava.error.TaskNotFoundException;
import com.ubr.dcagapiservicejava.repository.TaskRepository;
import com.ubr.dcagapiservicejava.repository.UserRepository;
import com.ubr.dcagapiservicejava.repository.UserTasksRepository;
import com.ubr.dcagapiservicejava.utils.DcagUtils;
import com.ubr.dcagapiservicejava.utils.GCPUtils;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
public class TaskService {


    Map<String, List<String>> userCityTaskMap = new HashMap<>();

    public final static Integer MILLISECOND = 1000;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserTasksRepository userTasksRepository;

    @Autowired
    private GCPUtils gcpUtils;
    @Value("${task-available-limit}")
    Integer limit;


    @PostConstruct
    public void init() {
        userCityTaskMap.put("HYDERABAD", List.of("HYDERABAD"));
        userCityTaskMap.put("DELHI", List.of("DELHI", "FARIDABAD", "JALANDHAR"));
        userCityTaskMap.put("MUMBAI", List.of("MUMBAI", "NAGPUR"));
        userCityTaskMap.put("PUNE", List.of("PUNE", "NAGPUR"));
        userCityTaskMap.put("CHENNAI", List.of("CHENNAI", "COIMBATORE"));
        userCityTaskMap.put("BENGALURU", List.of("BENGALURU", "MYSORE", "UDUPI"));

    }

    GeometryFactory factory = new GeometryFactory();

    public List<TaskResponse> findAll() {
        return taskRepository.findAll().stream()
                .map(this::taskToTaskResponse)
                .collect(toList());
    }


    public TaskResponse create(TaskDTO taskDTO) {
        Task task = new Task()
                .name(taskDTO.name())
                .taskType(taskDTO.taskType())
                .city(taskDTO.city())
                .language(taskDTO.language())
                .taskCategory(taskDTO.taskCategory())
                .input(taskDTO.input())
                .status(TaskStatus.NEW)
                .currency(taskDTO.currency())
                .price(taskDTO.price())
                .maxNoOfUsers(taskDTO.taskType() != null && taskDTO.taskType().equals(TaskType.UPLOAD_IMAGE) ? 1L : taskDTO.maxNoOfUsers())
                .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()))
                .lastUpdatedTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()))
                .dueDate(DcagUtils.covertDateStringToLocalDateTime(taskDTO.dueDateTime()));
        Task savedTask = taskRepository.save(task);
        log.info("Task is created - {}", taskDTO.name());
        return taskToTaskResponse(savedTask);
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
                .city(task.city())
                .language(task.language())
                .taskCategory(task.taskCategory())
                .input(task.input())
                .status(task.status())
                .maxNoOfUsers(task.maxNoOfUsers())
                .currency(task.currency())
                .price(task.price())
                .createDateTime(task.createTime())
                .dueDateTime(task.dueDate());

        /*String objectName = task.taskType().equals(TaskType.RECORD_AUDIO) ? task.input() : task.input() + ".mp3";

        if (task.taskType().equals(TaskType.RECORD_AUDIO)) {
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

        log.info("Update Task start - {}", taskDTO.name());
        Task task = new Task()
                .name(taskDTO.name())
                .taskType(taskDTO.taskType())
                .city(taskDTO.city())
                .language(taskDTO.language())
                .input(taskDTO.input())
                .status(taskDTO.status())
                .maxNoOfUsers(taskDTO.maxNoOfUsers())
                .currency(taskDTO.currency())
                .price(taskDTO.price())
                .lastUpdatedTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));
//                .location(factory.createPoint(new Coordinate(taskDTO.latitude(),taskDTO.longitude(),4326)));

        return taskRepository
                .findById(taskId)
                .map(existingUser -> taskRepository.save(task.createTime(existingUser.createTime())
                        .dueDate(existingUser.dueDate())
                        .city(existingUser.city())))
                .map(savedTask -> TaskResponse.builder()
                        .id(savedTask.id())
                        .name(savedTask.name())
                        .taskType(savedTask.taskType())
                        .taskCategory(savedTask.taskCategory())
                        .input(savedTask.input())
                        .status(savedTask.status())
                        .maxNoOfUsers(savedTask.maxNoOfUsers())
                        .currency(savedTask.currency())
                        .price(savedTask.price())
                        .build())
                .orElseThrow(DcagUtils.taskNotFound(taskId));
    }

    public void delete(Long taskId) {

        log.info("Delete Task start - {}", taskId);

        taskRepository.findById(taskId)
                .ifPresentOrElse(taskRepository::delete,
                        () -> {
                            throw new TaskNotFoundException("User not found: " + taskId);
                        });
    }

    public List<TaskResponse> findAvailableTasks(Boolean available, String userId, TaskType type) {

        Optional<User> userOptional = userRepository.findById(userId);

        List<String> cities = new ArrayList<>();

        List<String> languages = new ArrayList<>();

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            languages.add(user.preferredLanguage());
            languages.add(user.nativeLanguage());
            cities = userCityTaskMap.get(user.cityName());
        }
        if (type != TaskType.RECORD_AUDIO) {
            cities = null;
        }
        if (type != TaskType.LOCALIZATION_QUALITY) {
            languages = null;
        }
        return taskRepository.findAvailableTasks(available, userId, type, limit, (cities == null || cities.isEmpty()) ? null : cities, (languages == null || languages.isEmpty()) ? null : languages).stream()
                .filter(task -> task.status() != TaskStatus.COMPLETED && task.taskType() != TaskType.UPLOAD_IMAGE)
                .map(this::taskToTaskResponse)
                .collect(toList());
    }


//    public List<TaskResponse> findAAllNearerTasks(double latitude, double longitude, Integer distance) {
//
//        return taskRepository
//                .findAAllNearerTasks(factory.createPoint(new Coordinate(latitude,longitude,4326)),distance)
//                .stream().map(TaskResponse::new).toList();
//    }
}
