package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;

import java.util.List;

public record UserTaskDTO(

        UserTaskStatus status,

        String taskName,

        String output,

        String outputDesc,

        Boolean useInput

) {
}
