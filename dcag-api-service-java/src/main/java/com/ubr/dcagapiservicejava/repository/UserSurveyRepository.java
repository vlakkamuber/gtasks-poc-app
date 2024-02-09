package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.UserSurvey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSurveyRepository extends JpaRepository<UserSurvey,Long> {
    Optional<UserSurvey> findByUserId(String userId);
}
