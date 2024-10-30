package com.crawler.backend.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> globalExceptionHandler(Exception e, WebRequest request) {
        ErrorDetails error = new ErrorDetails(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                e.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userExceptionHandler(UserException e, WebRequest request) {
        ErrorDetails error = new ErrorDetails(
                LocalDateTime.now(),
                e.getHttpStatus().value(),
                e.getHttpStatus().getReasonPhrase(),
                e.getMessage(),
                request.getDescription(false));
            return new ResponseEntity<>(error, e.getHttpStatus());
    }

    @ExceptionHandler(value = { UsernameAlreadyExistException.class })
    public ResponseEntity<Object> handleUsernameAlreadyExistException(
            UsernameAlreadyExistException usernameAlreadyExistException) {
        UserException userException = new UserException(
                usernameAlreadyExistException.getMessage(),
                usernameAlreadyExistException.getCause(),
                HttpStatus.CONFLICT);
        return new ResponseEntity<>(userException, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = { NoUsersFoundException.class })
    public ResponseEntity<Object> handleNoUsersFoundException(NoUsersFoundException noUsersFoundException) {
        UserException userException = new UserException(noUsersFoundException.getMessage(),
                noUsersFoundException.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(userException, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = { UserNotFoundException.class })
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException userNotFoundException) {
        UserException userException = new UserException(userNotFoundException.getMessage(),
                userNotFoundException.getCause(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(userException, HttpStatus.NOT_FOUND);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = { MethodArgumentNotValidException.class })
    public Map<String, String> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String, String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorMap.put(error.getField(), error.getDefaultMessage());
        });
        return errorMap;
    }
}
