package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.UserSurvey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSurveyRepository extends JpaRepository<UserSurvey,Long> {
}
