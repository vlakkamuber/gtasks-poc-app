package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.User;
import com.ubr.dcagapiservicejava.domain.enums.UserStatus;
import com.ubr.dcagapiservicejava.domain.enums.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserResponse(

        String id,
        @Email
        String email,
        @Size(min = 2, message = "Name should be at least 2 chars length")
        String firstName,
        String lastName,
        String phoneNumber,

        String cityName,

        String preferredLanguage,

        String nativeLanguage,

        UserType userType,

        UserStatus status,

        String country,

        String currency

) {

    public UserResponse(User user) {
        this(user.id(),
                user.email(),
                user.firstName(),
                user.lastName(),
                user.phoneNumber(),
                user.cityName(),
                user.preferredLanguage(),
                user.nativeLanguage(),
                user.userType(),
                user.status(),
                user.country(),
                user.currency());
    }
}
