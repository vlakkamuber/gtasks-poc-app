package com.ubr.dcagapiservicejava.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyResult implements Serializable {

    String question;

    String answer;


}
