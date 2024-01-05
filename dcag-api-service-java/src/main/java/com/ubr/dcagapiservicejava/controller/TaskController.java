package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.dto.TaskDTO;
import com.ubr.dcagapiservicejava.dto.TaskResponse;
import com.ubr.dcagapiservicejava.dto.UserTaskDTO;
import com.ubr.dcagapiservicejava.dto.UserTaskResponse;
import com.ubr.dcagapiservicejava.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    TaskService taskService;

    @GetMapping(produces = "application/json")
    ResponseEntity<List<TaskResponse>> findAll() {
        return ResponseEntity.ok(taskService.findAll());
    }

    @GetMapping(value = "/{taskId}", produces = "application/json")
    ResponseEntity<TaskResponse> findById(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.findById(taskId));
    }

    @PostMapping(produces = "application/json")
    ResponseEntity<TaskResponse> create(/*@Valid*/ @RequestBody TaskDTO taskDTO) {
        TaskResponse savedUser = taskService.create(taskDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}") //UriComponentsBuilder.fromPath("/{id}")
                .buildAndExpand(savedUser.id())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(savedUser);
    }

    @PutMapping(value = "/{taskId}", produces = "application/json")
    ResponseEntity<TaskResponse> update(@PathVariable Long taskId, @RequestBody TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.update(taskId, taskDTO));
    }

    @DeleteMapping("/{taskId}")
    ResponseEntity<?> delete(@PathVariable Long taskId) {
        taskService.delete(taskId);
        return ResponseEntity.noContent().build();
    }


    @PostMapping(value = "/users", consumes = "application/json")
    ResponseEntity<UserTaskResponse> createUserTask(@RequestBody UserTaskDTO userTaskDTO) {
        return ResponseEntity.ok(taskService.createUserTask(userTaskDTO));
    }

    @GetMapping(value = "/users/{userId}", produces = "application/json")
    ResponseEntity<List<UserTaskResponse>> getUserTasks(@PathVariable String userId) {
        return ResponseEntity.ok(taskService.findUserTask(userId));
    }

//    @GetMapping("/tasks/nearer")
//    public List<TaskResponse> getAllNearerTask(@RequestParam double latitude, @RequestParam double longitude, @RequestParam Integer distance){
//        return taskService.findAAllNearerTasks(latitude, longitude, distance);
//    }
}
