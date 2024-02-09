package com.ubr.dcagapiservicejava.dto;

public record UserEventsDTO(

        String sessionId,

        String page,

        String actions,

        String city,

        String properties,

        String otherDetails,

        String userAgent

) {
}
