package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.dto.TaskDTO;
import com.ubr.dcagapiservicejava.dto.TaskResponse;
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

//    @GetMapping(produces = "application/json")
//    ResponseEntity<List<TaskResponse>> findAll() {
//        return ResponseEntity.ok(taskService.findAll());
//    }

    @GetMapping(produces = "application/json")
    ResponseEntity<List<TaskResponse>> findAvailableTasks(@RequestParam(required = false,defaultValue = "true") Boolean available) {
        return ResponseEntity.ok(taskService.findAvailableTasks(available));
    }

    @GetMapping(value = "/{taskId}", produces = "application/json")
    ResponseEntity<TaskResponse> findById(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.findById(taskId));
    }

    @CrossOrigin
    @PostMapping(produces = "application/json")
    ResponseEntity<TaskResponse> create(/*@Valid*/ @RequestBody TaskDTO taskDTO) {
        TaskResponse savedTask = taskService.create(taskDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}") //UriComponentsBuilder.fromPath("/{id}")
                .buildAndExpand(savedTask.getId())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(savedTask);
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
}
