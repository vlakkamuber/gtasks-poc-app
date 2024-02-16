package com.ubr.dcagapiservicejava.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Task validation failed")
public class TaskException extends RuntimeException {

    private String message;

    public TaskException(String message) {
        super(message);
        this.message = message;
    }
}
