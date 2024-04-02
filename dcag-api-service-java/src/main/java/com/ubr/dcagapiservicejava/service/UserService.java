package com.ubr.dcagapiservicejava.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ubr.dcagapiservicejava.domain.*;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import com.ubr.dcagapiservicejava.dto.*;
import com.ubr.dcagapiservicejava.error.TaskNotFoundException;
import com.ubr.dcagapiservicejava.error.UserNotFoundException;
import com.ubr.dcagapiservicejava.repository.*;
import com.ubr.dcagapiservicejava.utils.DcagUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;

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

    @Autowired
    UserTasksRepository userTasksRepository;

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

        log.info("User creation started - {}", userDTO.userId());
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
        log.info("User update started - {}", userDTO.userId());
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
        log.info("User delete started - {}", userId);
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

        if (userRepository.findById(userId).isPresent()) {

            UserIssue issue = userIssueRepository.save(new UserIssue().user(new User().id(userId))
                    .taskType(userIssueDTO.type()).description(userIssueDTO.description())
                    .summary(userIssueDTO.summary())
                    .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis())));

            log.info("User issue submitted - {}", userId);

            return issue.id();
        } else {
            throw new UserNotFoundException("User not found: " + userId);
        }
    }

    public Long saveUserEvents(String userId, UserEventsDTO userEventsDTO) {

        if (userRepository.findById(userId).isPresent()) {

            UserEvents userEvents = userEventsRepository.save(new UserEvents().user(new User().id(userId))
                    .sessionId(userEventsDTO.sessionId()).page(userEventsDTO.page())
                    .actions(userEventsDTO.actions()).properties(userEventsDTO.properties())
                    .city(userEventsDTO.city()).otherDetails(userEventsDTO.otherDetails())
                    .userAgent(userEventsDTO.userAgent())
                    .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis())));
            log.info("Saved User Events for user - {}", userId);
            return userEvents.id();
        } else {
            throw new UserNotFoundException("User not found: " + userId);
        }
    }

    public Long saveUserSurvey(String userId, UserSurveyDTO userSurveyDTO) throws JsonProcessingException {

        if (userRepository.findById(userId).isPresent()) {

            Optional<UserSurvey> userSurveyOptional = userSurveyRepository.findByUserId(userId);

            UserSurvey userSurvey = userSurveyOptional.orElseGet(UserSurvey::new);

            userSurvey.user(new User().id(userId)).status(userSurveyDTO.status()).survey(objectMapper.writeValueAsString(userSurveyDTO.survey()))
                    .createTime(DcagUtils.convertEpochToLocalDateTime(System.currentTimeMillis()));

            userSurvey = userSurveyRepository.save(userSurvey);
            log.info("Saved Survey for user - {}", userId);
            return userSurvey.id();
        } else {
            throw new UserNotFoundException("User not found: " + userId);
        }

    }

    public UserEarningResponse getUserEarnings(String userId, Long startDate, Long endDate) {

        List<UserTask> userTasks = userTasksRepository.getEarnings(userId, DcagUtils.convertEpochToLocalDateTime(startDate), DcagUtils.convertEpochToLocalDateTime(endDate));
        if (CollectionUtils.isEmpty(userTasks)) {
            throw new TaskNotFoundException("User Task Not found for this date range: " + userId);
        }

        Optional<User> userOptional = userRepository.findById(userId);
        User user = userOptional.orElse(null);

        // Grouping the data based on task type
        Map<TaskType, List<UserTask>> taskTypeMap = userTasks.stream()
                .collect(Collectors.groupingBy(userTask -> userTask.task().taskType()));

        return UserEarningResponse.builder().
                dateRange(DateRangeResponse.builder().startDate(startDate).endDate(endDate).build())
                .totals(getTotalEarningResponse(userTasks, user))
                .taskTypes(EarningTaskTypesResponse.builder()
                        .imageLabelling(getTotalEarningResponse(taskTypeMap.getOrDefault(TaskType.IMAGE_LABELLING, new ArrayList<>()), user))
                        .recordAudio(getTotalEarningResponse(taskTypeMap.getOrDefault(TaskType.RECORD_AUDIO, new ArrayList<>()), user))
                        .menuReviewResponse(getTotalEarningResponse(taskTypeMap.getOrDefault(TaskType.MENU_PHOTO_REVIEW, new ArrayList<>()), user))
                        .localizationQuality(getTotalEarningResponse(taskTypeMap.getOrDefault(TaskType.LOCALIZATION_QUALITY, new ArrayList<>()), user))
                        .receiptDigitization(getTotalEarningResponse(taskTypeMap.getOrDefault(TaskType.RECEIPT_DIGITIZATION, new ArrayList<>()), user))
                        .build()
                )
                .build();

    }

    private TotalEarningsResponse getTotalEarningResponse(List<UserTask> userTasks, User user) {
        return TotalEarningsResponse.builder().currency(user != null ? user.currency() : "INR")
                .tasksCompleted((long) userTasks.size()).
                durationInSeconds(userTasks.stream().mapToLong(e -> DcagUtils.convertLocalDateTimeToEpoch(e.completionTime()) - DcagUtils.convertLocalDateTimeToEpoch(e.startTime())).sum()).
                amount(userTasks.stream().map(e -> e.task().price()).reduce(BigDecimal.ZERO, BigDecimal::add)).build();
    }

    public UserEarningDetailsResponse getUserEarningsDetails(String userId, TaskType taskType, Long startDate, Long endDate) {

        List<UserTask> userTasks = userTasksRepository.getEarnings(userId, DcagUtils.convertEpochToLocalDateTime(startDate), DcagUtils.convertEpochToLocalDateTime(endDate));
        if (CollectionUtils.isEmpty(userTasks)) {
            throw new TaskNotFoundException("User Task Not found for this date range: " + userId);
        }

        userTasks = userTasks.stream().filter(userTask -> userTask.task().taskType().equals(taskType)).toList();

        return UserEarningDetailsResponse.builder()
                .taskType(taskType)
                .dateRange(DateRangeResponse.builder()
                        .startDate(startDate)
                        .endDate(endDate).build())
                .tasks(getTasks(userTasks))
                .build();

    }

    private List<UserEarningTaskDetailsResponse> getTasks(List<UserTask> userTasks) {

        List<UserEarningTaskDetailsResponse> userEarningTaskDetailsResponseList = new ArrayList<>();

        userTasks.forEach(e -> userEarningTaskDetailsResponseList.add(UserEarningTaskDetailsResponse.builder()
                .taskId(e.task().id())
                .amount(e.task().price())
                .currency(e.task().currency())
                .completedOn(DcagUtils.convertLocalDateTimeToEpoch(e.completionTime()))
                .build()));

        return userEarningTaskDetailsResponseList;
    }
}
