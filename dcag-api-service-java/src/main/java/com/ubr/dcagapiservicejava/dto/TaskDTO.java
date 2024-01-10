package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskType;

public record TaskDTO(

        String name,

        TaskType taskType,

        String input,

        Double latitude,

        Double longitude,

        String currency,

        Double price,

        long maxNoOfUsers

) {
}
