package com.ubr.dcagapiservicejava.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ubr.dcagapiservicejava.domain.UserEvents;
import com.ubr.dcagapiservicejava.domain.UserIssue;
import com.ubr.dcagapiservicejava.domain.UserSurvey;
import com.ubr.dcagapiservicejava.dto.*;
import com.ubr.dcagapiservicejava.error.UserNotFoundException;
import com.ubr.dcagapiservicejava.repository.UserEventsRepository;
import com.ubr.dcagapiservicejava.repository.UserIssueRepository;
import com.ubr.dcagapiservicejava.repository.UserRepository;
import com.ubr.dcagapiservicejava.repository.UserSurveyRepository;
import com.ubr.dcagapiservicejava.utils.DcagUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ubr.dcagapiservicejava.domain.User;

import java.util.List;
import java.util.function.Supplier;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserIssueRepository userIssueRepository;

    @Autowired
    UserEventsRepository userEventsRepository;

    @Autowired
    UserSurveyRepository userSurveyRepository;

    final ObjectMapper objectMapper = new ObjectMapper();

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
                .userType(userDTO.userType())
                .phoneNumber(userDTO.phoneNumber())
                .cityName(userDTO.cityName())
                .nativeLanguage(userDTO.nativeLanguage())
                .preferredLanguage(userDTO.preferredLanguage())
                .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));

        log.info("User creation started - {}",userDTO.userId());
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
                .userType(userDTO.userType())
                .phoneNumber(userDTO.phoneNumber());
        log.info("User update started - {}",userDTO.userId());
        return userRepository
                .findById(userId)
                .map(existingUser -> userRepository.save(userToSave.cityName(existingUser.cityName())
                        .nativeLanguage(existingUser.nativeLanguage())
                        .preferredLanguage(existingUser.preferredLanguage())
                        .createTime(existingUser.createTime())))
                .map(UserResponse::new)
                .orElseThrow(userNotFound(userId));
    }

    public void delete(String userId) {
        log.info("User delete started - {}",userId);
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

            UserIssue issue = userIssueRepository.save(new UserIssue().user(new User().id(userId))
                    .taskType(userIssueDTO.type()).description(userIssueDTO.description())
                    .summary(userIssueDTO.summary())
                    .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis())));

            log.info("User issue submitted - {}",userId);

            return issue.id();
        }else {
            throw new UserNotFoundException("User not found: " + userId);
        }
    }

    public Long saveUserEvents(String userId, UserEventsDTO userEventsDTO) {

        if(userRepository.findById(userId).isPresent()) {

            UserEvents userEvents = userEventsRepository.save(new UserEvents().user(new User().id(userId))
                    .sessionId(userEventsDTO.sessionId()).page(userEventsDTO.page())
                    .actions(userEventsDTO.actions()).properties(userEventsDTO.properties())
                    .city(userEventsDTO.city()).otherDetails(userEventsDTO.otherDetails())
                    .userAgent(userEventsDTO.userAgent())
                    .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis())));
            log.info("Saved User Events for user - {}",userId);
            return userEvents.id();
        }else {
            throw new UserNotFoundException("User not found: " + userId);
        }
    }

    public Long saveUserSurvey(String userId, UserSurveyDTO userSurveyDTO) throws JsonProcessingException {

        if(userRepository.findById(userId).isPresent()) {
            UserSurvey userSurvey = userSurveyRepository.save(new UserSurvey().user(new User().id(userId))
                    .status(userSurveyDTO.status()).survey(objectMapper.writeValueAsString(userSurveyDTO.survey()))
                    .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis())));
            log.info("Saved Survey for user - {}",userId);
            return userSurvey.id();
        }else {
            throw new UserNotFoundException("User not found: " + userId);
        }

    }
}
