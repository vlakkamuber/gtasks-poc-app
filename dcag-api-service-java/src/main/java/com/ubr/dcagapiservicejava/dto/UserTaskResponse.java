package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import com.ubr.dcagapiservicejava.domain.enums.UserTaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTaskResponse {
    private Long id;
    private String userId;
    private Long taskId;
    private String taskName;
    private TaskType taskType;
    private String input;
    private String answer;
    private String output;
    private String outputFileType;
    private String outputDesc;
    private UserTaskStatus status;
    private String currency;
    private BigDecimal price;
    private Long startTime;
    private Long completedTime;
    private String inputUrl;
    private String outputUrl;
    private String uploadUrl;
    private Long createDateTime;
    private Long dueDateTime;
    private Boolean useInput;

}
