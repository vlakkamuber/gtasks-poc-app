package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.enums.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserDTO(
        String userId,
        @Email
        String email,
        @Size(min = 2, message = "Name should be at least 2 chars length")
        String firstName,

        String lastName,
        String phoneNumber,

        String cityName,

        UserType userType,

        String preferredLanguage,

        String nativeLanguage,

        String country,

        String currency
) {
}