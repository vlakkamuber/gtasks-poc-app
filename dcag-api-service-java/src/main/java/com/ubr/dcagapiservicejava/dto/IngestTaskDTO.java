package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskType;

public record IngestTaskDTO(

        TaskType taskType,

        String file
) {
}
