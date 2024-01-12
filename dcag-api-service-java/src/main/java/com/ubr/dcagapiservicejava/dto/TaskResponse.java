package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskStatus;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {
    private Long id;
    private String name;
    private TaskType taskType;
    private String input;
    private TaskStatus status;
    private long  maxNoOfUsers;
    private String currency;
    private Double price;
    private String inputUrl;
    private String outputUrl;
    private String uploadUrl;
    private LocalDateTime createDateTime;
    private LocalDateTime dueDateTime;
}
