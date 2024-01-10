package com.ubr.dcagapiservicejava.repository;

//import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
//import com.ubr.dcagapiservicejava.domain.UserTask;

import com.ubr.dcagapiservicejava.domain.User;
import com.ubr.dcagapiservicejava.domain.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserTasksRepository extends JpaRepository<UserTask,Long> {

    Optional<List<UserTask>> findByUserId(String userId);

    Optional<UserTask> findByUserIdAndTaskId(String userId, Long taskId);


    Optional<List<UserTask>> findByTaskId(Long taskId);
}

