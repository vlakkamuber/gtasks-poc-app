package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;

public record UserTaskDTO(

        String userId,

        Long taskId,

        TaskStatus status,

        Long startTime

) {
}
