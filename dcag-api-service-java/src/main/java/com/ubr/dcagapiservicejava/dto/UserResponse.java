package com.ubr.dcagapiservicejava.dto;

import com.ubr.dcagapiservicejava.domain.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserResponse(

        String id,
        @Email
        String email,
        @Size(min = 2, message = "Name should be at least 2 chars length")
        String firstName,
        String lastName,
        String phoneNumber

) {

    public UserResponse(User user) {
        this(user.id(),
                user.email(),
                user.firstName(),
                user.lastName(),
                user.phoneNumber());
    }
}
