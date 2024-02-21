package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;

public record UserTaskDTO(

        UserTaskStatus status,

        String taskName,

        String output,

        String outputFileType,

        String outputDesc,

        Boolean useInput

) {
}
