package com.ubr.dcagapiservicejava.repository;

import com.ubr.dcagapiservicejava.domain.UserEvents;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEventsRepository extends JpaRepository<UserEvents,Long> {
}
