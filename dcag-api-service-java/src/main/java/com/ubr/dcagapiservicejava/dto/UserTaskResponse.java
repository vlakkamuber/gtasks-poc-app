package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.UserTask;
import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZoneId;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTaskResponse{


        private Long id;

        private String userId;

        private String taskName;

        private TaskType taskType;

        private TaskStatus status;

        private Long startTime;

        private Long completedTime;

        private String inputUrl;
        private String outputUrl;
        private String uploadUrl;

}
