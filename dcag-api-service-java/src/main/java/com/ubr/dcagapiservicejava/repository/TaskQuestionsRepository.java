package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.TaskQuestions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskQuestionsRepository extends JpaRepository<TaskQuestions, Long> {

    List<TaskQuestions> findByTaskId(Long taskId);
}
