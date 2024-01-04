package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.dto.UserDTO;
import com.ubr.dcagapiservicejava.service.UserService;
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
    UserService userService;

    @GetMapping(produces = "application/json")
    ResponseEntity<List<UserDTO>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping(value = "/{userId}", produces = "application/json")
    ResponseEntity<UserDTO> findById(@PathVariable String userId) {
        return ResponseEntity.ok(userService.findById(userId));
    }

    @GetMapping("/byPhoneNumber/{phoneNumber}")
    ResponseEntity<UserDTO> getUserByPhoneNumber(@PathVariable String phoneNumber) {
        return ResponseEntity.ok(userService.getUserByPhoneNumber(phoneNumber));
    }

    @PostMapping(produces = "application/json")
    ResponseEntity<UserDTO> create(/*@Valid*/ @RequestBody UserDTO userDTO) {
        UserDTO savedUser = userService.create(userDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}") //UriComponentsBuilder.fromPath("/{id}")
                .buildAndExpand(savedUser.id())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(savedUser);
    }

    @PutMapping(value = "{userId}", produces = "application/json")
    ResponseEntity<UserDTO> update(@PathVariable String userId, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.update(userId, userDTO));
    }

    @DeleteMapping("{userId}")
    ResponseEntity<UserDTO> delete(@PathVariable String userId) {
        userService.delete(userId);
        return ResponseEntity.noContent().build();
    }
}
