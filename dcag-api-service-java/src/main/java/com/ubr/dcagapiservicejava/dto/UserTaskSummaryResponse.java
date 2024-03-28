package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserSurveyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTaskSummaryResponse {

    private Long completedTaskCount;

    private BigDecimal totalEarning;

    private String currency;

    private Long todayCompletedTasks;

    private BigDecimal todayEarnings;

    private UserSurveyStatus surveyStatus;
}
