package com.ubr.dcagapiservicejava.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "User not authorized")
public class UnauthorizedUserException extends RuntimeException {

    private String message;
    public UnauthorizedUserException(String message) {
        super(message);
        this.message = message;
    }
}
