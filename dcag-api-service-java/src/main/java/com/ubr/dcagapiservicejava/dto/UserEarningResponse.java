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
public class UserEarningResponse {

    @JsonProperty("date_range")
    DateRangeResponse dateRange;

    TotalEarningsResponse totals;

    @JsonProperty("task_types")
    EarningTaskTypesResponse taskTypes;

}
