package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;

public record UserTaskDTO(

        UserTaskStatus status,

        String taskName,

        String output,

        String outputDesc,

        Boolean useInput

) {
}
