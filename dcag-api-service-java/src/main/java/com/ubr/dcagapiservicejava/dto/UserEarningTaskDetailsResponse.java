package com.ubr.dcagapiservicejava.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEarningTaskDetailsResponse {

    @JsonProperty("task_id")
    Long taskId;

    Double amount;

    String currency;

    @JsonProperty("completed_on")
    Long completedOn;
}
