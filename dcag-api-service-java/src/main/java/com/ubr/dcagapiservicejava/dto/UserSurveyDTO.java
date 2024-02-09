package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserSurveyStatus;

import java.util.List;

public record UserSurveyDTO(

        UserSurveyStatus status,

        List<SurveyResult> survey

) {
}
