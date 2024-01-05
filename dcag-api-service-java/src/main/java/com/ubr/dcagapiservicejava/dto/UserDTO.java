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

        Double latitude,

        Double longitude,

        String lastName,
        String phoneNumber
){}