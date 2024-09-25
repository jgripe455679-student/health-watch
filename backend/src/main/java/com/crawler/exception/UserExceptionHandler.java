package com.crawler.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(value = {UsernameAlreadyExistException.class})
    public ResponseEntity<Object> handleUsernameAlreadyExistException(UsernameAlreadyExistException usernameAlreadyExistException) {
        UserException userException = new UserException(
            usernameAlreadyExistException.getMessage(),
            usernameAlreadyExistException.getCause(),
            HttpStatus.CONFLICT
        );
        return new ResponseEntity<>(userException, HttpStatus.CONFLICT);
    }
}
