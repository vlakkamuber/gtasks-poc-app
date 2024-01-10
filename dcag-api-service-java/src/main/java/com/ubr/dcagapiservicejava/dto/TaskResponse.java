package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {
    private Long id;
    private String name;
    private TaskType taskType;
    private long  maxNoOfUsers;
    private String currency;
    private Double price;
    private String input;
    private String inputUrl;
    private String outputUrl;
    private String uploadUrl;
}
