package com.ubr.dcagapiservicejava.repository;

//import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
//import com.ubr.dcagapiservicejava.domain.UserTask;

import com.ubr.dcagapiservicejava.domain.UserTask;
import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserTasksRepository extends JpaRepository<UserTask, Long> {

    List<UserTask> findByUserId(String userId);

    List<UserTask> findByUserIdAndStatus(String userId, UserTaskStatus status);

    Optional<UserTask> findByUserIdAndTaskId(String userId, Long taskId);


    Optional<List<UserTask>> findByTaskId(Long taskId);

    @Query("Select T from UserTask T where T.task.id = :taskId and T.user.userType = 'DRIVER'")
    List<UserTask> findByTaskIdAndUserType(Long taskId);

    @Query("Select T from UserTask T where T.user.id = :userId and T.status = 'COMPLETED' and T.completionTime >=:startDate and T.completionTime <= :endDate")
    List<UserTask> getEarnings(String userId, LocalDateTime startDate, LocalDateTime endDate);
}

