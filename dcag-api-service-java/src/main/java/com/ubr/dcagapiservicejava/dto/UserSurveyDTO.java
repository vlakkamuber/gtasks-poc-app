package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserSurveyStatus;

public record UserSurveyDTO(

        UserSurveyStatus status,

        String survey

) {
}
