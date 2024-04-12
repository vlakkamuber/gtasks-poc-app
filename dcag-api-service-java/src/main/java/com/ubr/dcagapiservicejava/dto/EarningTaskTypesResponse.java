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
public class EarningTaskTypesResponse {

    @JsonProperty("RECORD_AUDIO")
    TotalEarningsResponse recordAudio;

    @JsonProperty("IMAGE_LABELLING")
    TotalEarningsResponse imageLabelling;

    @JsonProperty("RECEIPT_DIGITIZATION")
    TotalEarningsResponse receiptDigitization;

    @JsonProperty("MENU_PHOTO_REVIEW")
    TotalEarningsResponse menuReviewResponse;

    @JsonProperty("LOCALIZATION_QUALITY")
    TotalEarningsResponse localizationQuality;

    @JsonProperty("RECORD_SURVEY")
    TotalEarningsResponse recordSurvey;
}
