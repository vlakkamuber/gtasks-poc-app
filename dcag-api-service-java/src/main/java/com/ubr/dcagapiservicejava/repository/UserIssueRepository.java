package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.UserIssue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserIssueRepository extends JpaRepository<UserIssue, String> {

}

