package com.ubr.dcagapiservicejava.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocDetailsResponse {

    private String name;

    private String type;

    private String url;
}
