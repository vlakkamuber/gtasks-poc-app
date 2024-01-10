package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;

public record UserTaskDTO(

        UserTaskStatus status,

        String output,

        String outputDesc,

        Long startTime,

        Long completionTime

) {
}
