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
public class TotalEarningsResponse {

    BigDecimal amount;

    String currency;

    @JsonProperty("tasks_completed")
    Long tasksCompleted;

    @JsonProperty("duration_in_seconds")
    Long durationInSeconds;


}
