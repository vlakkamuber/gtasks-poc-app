package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.UserTask;
import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;

import java.time.ZoneId;

public record UserTaskResponse(


        Long id,
        String userId,

        String taskName,

        TaskType taskType,

        TaskStatus status,

        Long startTime,

        Long completedTime
) {

    public UserTaskResponse(UserTask userTask) {
        this(userTask.id(),
                userTask.user().id(),
                userTask.task().name(),
                userTask.task().taskType(),
                userTask.status(),
                userTask.startTime()!=null ?
                        userTask.startTime().atZone(ZoneId.systemDefault()).toEpochSecond()*1000 :
                        null,
                userTask.completionTime()!=null ?
                        userTask.completionTime().atZone(ZoneId.systemDefault()).toEpochSecond()*1000 :
                        null
                );
    }

}
