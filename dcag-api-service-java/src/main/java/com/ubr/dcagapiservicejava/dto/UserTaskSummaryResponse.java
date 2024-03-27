package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserSurveyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTaskSummaryResponse {

    private Long completedTaskCount;

    private Double totalEarning;

    private String currency;

    private Long todayCompletedTasks;

    private Double todayEarnings;

    private UserSurveyStatus surveyStatus;
}
