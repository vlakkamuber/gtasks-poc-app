package com.ubr.dcagapiservicejava.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Task not found")
public class TaskNotFoundException extends RuntimeException {
    private String message;
    public TaskNotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
