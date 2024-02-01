package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.UserTaskAnswers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTaskAnswersRepository extends JpaRepository<UserTaskAnswers, Long> {

    List<UserTaskAnswers> findByUserTaskId(Long userTaskId);
}
