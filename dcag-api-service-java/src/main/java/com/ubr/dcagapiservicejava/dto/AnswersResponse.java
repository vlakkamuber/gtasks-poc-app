package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.QuestionType;
import lombok.*;

@EqualsAndHashCode(callSuper = false)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnswersResponse{

    private Long questionId;

    private String description;

    private QuestionType questionType;

    private String typeContent;

    private String answer;
}
