package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.dto.UserTaskDTO;
import com.ubr.dcagapiservicejava.dto.UserTaskResponse;
import com.ubr.dcagapiservicejava.dto.UserTaskSummaryResponse;
import com.ubr.dcagapiservicejava.service.UserTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users/{userId}/tasks")
public class UserTaskController {
    
    @Autowired
    private UserTaskService userTaskService;

    @CrossOrigin
    @PostMapping(value = "/{taskId}", consumes = "application/json")
    ResponseEntity<UserTaskResponse> createUserTask(@PathVariable String userId, @PathVariable Long taskId, @RequestBody UserTaskDTO userTaskDTO) {
        return ResponseEntity.ok(userTaskService.createUserTask(userId, taskId, userTaskDTO));
    }

    @CrossOrigin
    @PutMapping(value = "/{taskId}", consumes = "application/json")
    ResponseEntity<UserTaskResponse> updateUserTask(@PathVariable String userId, @PathVariable Long taskId, @RequestBody UserTaskDTO userTaskDTO) {
        return ResponseEntity.ok(userTaskService.updateUserTask(userId, taskId, userTaskDTO));
    }

    @CrossOrigin
    @GetMapping(produces = "application/json")
    ResponseEntity<List<UserTaskResponse>> getUserTasks(@PathVariable String userId) {
        return ResponseEntity.ok(userTaskService.findUserTasks(userId));
    }

    @CrossOrigin
    @GetMapping(value = "/{taskId}", produces = "application/json")
    ResponseEntity<UserTaskResponse> findUserTaskById(@PathVariable String userId, @PathVariable Long taskId) {
        return ResponseEntity.ok(userTaskService.findUserTaskById(userId,taskId));
    }

    @CrossOrigin
    @GetMapping(value = "/summary", produces = "application/json")
    ResponseEntity<UserTaskSummaryResponse> getUserTasksSummary(@PathVariable String userId) {
        return ResponseEntity.ok(userTaskService.getUserTasksSummary(userId));
    }

    @CrossOrigin
    @DeleteMapping(value = "/{taskId}", consumes = "application/json")
    ResponseEntity<?> deleteUserTask(@PathVariable String userId, @PathVariable Long taskId) {

        userTaskService.deleteUserTask(userId, taskId);
        return ResponseEntity.noContent().build();
    }
}
