package com.ubr.dcagapiservicejava.service;

 
import com.ubr.dcagapiservicejava.domain.UserIssue;
import com.ubr.dcagapiservicejava.dto.UserDTO;
import com.ubr.dcagapiservicejava.dto.UserIssueDTO;
import com.ubr.dcagapiservicejava.dto.UserResponse;
import com.ubr.dcagapiservicejava.error.UserNotFoundException;
import com.ubr.dcagapiservicejava.repository.UserIssueRepository;
import com.ubr.dcagapiservicejava.repository.UserRepository;
import com.ubr.dcagapiservicejava.utils.DcagUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ubr.dcagapiservicejava.domain.User;

import java.util.List;
import java.util.function.Supplier;

import static java.util.stream.Collectors.toList;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserIssueRepository userIssueRepository;

    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(UserResponse::new)
                .collect(toList());
    }

    public UserResponse create(UserDTO userDTO) {
        User user = new User()
                .id(userDTO.userId())
                .email(userDTO.email())
                .firstName(userDTO.firstName())
                .lastName(userDTO.lastName())
                .phoneNumber(userDTO.phoneNumber());

        return new UserResponse(userRepository.save(user));
    }

    public UserResponse findById(String userId) {
        return userRepository
                .findById(userId)
                .map(UserResponse::new)
                .orElseThrow(userNotFound(userId));
    }

    public UserResponse update(String userId, UserDTO userDTO) {
        User userToSave = new User()
                .id(userId)
                .email(userDTO.email())
                .firstName(userDTO.firstName())
                .lastName(userDTO.lastName())
                .phoneNumber(userDTO.phoneNumber());

        return userRepository
                .findById(userId)
                .map(existingUser -> userRepository.save(userToSave))
                .map(UserResponse::new)
                .orElseThrow(userNotFound(userId));
    }

    public void delete(String userId) {
        userRepository.findById(userId)
                .ifPresentOrElse(userRepository::delete,
                        () -> {
                            throw new UserNotFoundException("User not found: " + userId);
                        });
    }

    private Supplier<UserNotFoundException> userNotFound(String userId) {
        return () -> new UserNotFoundException("User not found: " + userId);
    }

    public UserResponse getUserByPhoneNumber(String phoneNumber) {
        return userRepository
                .findByPhoneNumber(phoneNumber)
                .map(UserResponse::new)
                .orElseThrow(userNotFound(phoneNumber));
    }

    public Long saveUserIssue(String userId, UserIssueDTO userIssueDTO) {

        if(userRepository.findById(userId).isPresent()) {

            UserIssue issue = userIssueRepository.save(new UserIssue().user(new User().id(userId)).
                    description(userIssueDTO.description()).summary(userIssueDTO.summary()).createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis())));

            return issue.id();
        }else {
            throw new UserNotFoundException("User not found: " + userId);
        }
    }
}
