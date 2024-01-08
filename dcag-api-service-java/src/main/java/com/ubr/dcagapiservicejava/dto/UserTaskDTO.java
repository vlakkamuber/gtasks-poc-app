package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;

public record UserTaskDTO(

        TaskStatus status,

        String output,

        String outputDesc,

        Long startTime,

        Long completionTime

) {
}
