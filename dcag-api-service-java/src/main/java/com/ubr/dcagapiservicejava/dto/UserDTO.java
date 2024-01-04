package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserDTO(
        String id,
        @Email
        String email,
        @Size(min = 2, message = "Name should be at least 2 chars length")
        String firstName,
        String lastName,
        Double locationLat,
        Double locationLong,
        String phoneNumber
) {
    public UserDTO(User user) {
        this(user.id(),
                user.email(),
                user.firstName(),
                user.lastName(),
                user.locationLat(),
                user.locationLong(),
                user.phoneNumber());
    }
}