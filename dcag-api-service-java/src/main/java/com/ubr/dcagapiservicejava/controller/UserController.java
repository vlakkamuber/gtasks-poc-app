package com.ubr.dcagapiservicejava.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ubr.dcagapiservicejava.dto.*;
import com.ubr.dcagapiservicejava.service.TaskService;
import com.ubr.dcagapiservicejava.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//import reactor.core.publisher.Flux;

//import javax.validation.Valid; // TODO: validation

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    TaskService taskService;

    /*@GetMapping
    private Flux<User> getAllUsers() {
        return userRepository.findAll();
    }*/

    @GetMapping(produces = "application/json")
    ResponseEntity<List<UserResponse>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping(value = "/{userId}", produces = "application/json")
    ResponseEntity<UserResponse> findById(@PathVariable String userId) {
        return ResponseEntity.ok(userService.findById(userId));
    }

    @GetMapping("/byPhoneNumber/{phoneNumber}")
    ResponseEntity<UserResponse> getUserByPhoneNumber(@PathVariable String phoneNumber) {
        return ResponseEntity.ok(userService.getUserByPhoneNumber(phoneNumber));
    }

    @CrossOrigin
    @PostMapping(produces = "application/json")
    ResponseEntity<UserResponse> create(/*@Valid*/ @RequestBody UserDTO userDTO) {
        UserResponse savedUser = userService.create(userDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}") //UriComponentsBuilder.fromPath("/{id}")
                .buildAndExpand(savedUser.id())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(savedUser);
    }

    @PutMapping(value = "/{userId}", produces = "application/json")
    ResponseEntity<UserResponse> update(@PathVariable String userId, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.update(userId, userDTO));
    }

    @DeleteMapping("/{userId}")
    ResponseEntity<?> delete(@PathVariable String userId) {
        userService.delete(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{userId}/issues")
    ResponseEntity<?> saveUserIssue(@PathVariable String userId, @RequestBody UserIssueDTO userIssueDTO) {
       Long savedId =  userService.saveUserIssue(userId,userIssueDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}") //UriComponentsBuilder.fromPath("/{id}")
                .buildAndExpand(savedId)
                .toUri();

        return ResponseEntity.created(location).build();
    }


    @PostMapping("/{userId}/analytics/events")
    ResponseEntity<?> saveUserEvents(@PathVariable String userId, @RequestBody UserEventsDTO userEventsDTO) {
        Long savedId =  userService.saveUserEvents(userId,userEventsDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}") //UriComponentsBuilder.fromPath("/{id}")
                .buildAndExpand(savedId)
                .toUri();

        return ResponseEntity.created(location).build();
    }


    @PostMapping("/{userId}/survey")
    ResponseEntity<?> saveUserSurvey(@PathVariable String userId, @RequestBody UserSurveyDTO userSurveyDTO) throws JsonProcessingException {
        Long savedId =  userService.saveUserSurvey(userId,userSurveyDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}") //UriComponentsBuilder.fromPath("/{id}")
                .buildAndExpand(savedId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

//    @GetMapping("/tasks/nearer")
//    public List<TaskResponse> getAllNearerTask(@RequestParam double latitude, @RequestParam double longitude, @RequestParam Integer distance){
//        return taskService.findAAllNearerTasks(latitude, longitude, distance);
//    }
}
