package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionsRepository extends JpaRepository<Questions, Long> {
}