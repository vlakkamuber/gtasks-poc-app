package com.ubr.dcagapiservicejava.controller;

import com.ubr.dcagapiservicejava.domain.User;
import com.ubr.dcagapiservicejava.dto.UserDTO;
import com.ubr.dcagapiservicejava.dto.UserResponse;
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
}
