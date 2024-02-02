package com.ubr.dcagapiservicejava.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class DcagExceptionHandler {

    @ExceptionHandler(value = {TaskNotFoundException.class, UserNotFoundException.class})
    public ResponseEntity handleNotFound(Exception exception) {
        DcagException ex = new DcagException(new Date(), exception.getMessage());
        return new ResponseEntity(ex, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException exception) {

        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            String msg = error.getDefaultMessage();
            errors.put(field, msg);
        });
        return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = UnauthorizedUserException.class)
    public ResponseEntity handleUnauthorizedException(UnauthorizedUserException exception) {
        log.error("Unauthorized user: ", exception);
        DcagException ex = new DcagException(new Date(), exception.getMessage());
        return new ResponseEntity(ex, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity handleException(Exception exception) {
        log.error("Exception: ", exception);
        DcagException ex = new DcagException(new Date(), exception.getMessage());
        return new ResponseEntity(ex, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

