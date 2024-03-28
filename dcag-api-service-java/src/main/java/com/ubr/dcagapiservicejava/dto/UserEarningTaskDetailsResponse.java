package com.ubr.dcagapiservicejava.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEarningTaskDetailsResponse {

    @JsonProperty("task_id")
    Long taskId;

    BigDecimal amount;

    String currency;

    @JsonProperty("completed_on")
    Long completedOn;
}
