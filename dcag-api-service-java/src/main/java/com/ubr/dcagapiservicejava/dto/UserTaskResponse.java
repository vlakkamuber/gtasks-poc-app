package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTaskResponse {
    private Long id;
    private String userId;
    private String taskName;
    private TaskType taskType;
    private UserTaskStatus status;
    private String currency;
    private Double price;
    private Long startTime;
    private Long completedTime;
    private String inputUrl;
    private String outputUrl;
    private String uploadUrl;

}
