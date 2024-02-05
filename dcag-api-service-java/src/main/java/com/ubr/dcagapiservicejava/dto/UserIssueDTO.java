package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskType;

public record UserIssueDTO(

        TaskType taskType,

        String summary,
        String description

) {
}
