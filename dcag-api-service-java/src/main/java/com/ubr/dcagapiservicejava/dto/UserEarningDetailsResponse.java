package com.ubr.dcagapiservicejava.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ubr.dcagapiservicejava.domain.enums.TaskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEarningDetailsResponse {

    @JsonProperty("task_type")
    TaskType taskType;

    @JsonProperty("date_range")
    DateRangeResponse dateRange;

    List<UserEarningTaskDetailsResponse> tasks;
}
