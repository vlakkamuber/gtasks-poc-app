package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;

import java.time.LocalDateTime;

public record TaskDTO(

        String name,

        TaskType taskType,

        String input,

        TaskStatus status,

        Double latitude,

        Double longitude,

        String currency,

        Double price,

        long maxNoOfUsers,

        String dueDateTime
) {
}
