package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.Task;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import jakarta.persistence.Enumerated;

public record TaskResponse(

        
        Long id,

        String name,
        
        TaskType taskType,

        String currency,

        Integer price
) {

    public TaskResponse(Task task) {
        this(task.id(),
                task.name(),
                task.taskType(),
                task.currency(),
                task.price());
    }
}
