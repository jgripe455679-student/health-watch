package com.crawler.backend.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class UserException extends RuntimeException {
    private final String message;
    private final Throwable throwable;
    private final HttpStatus httpStatus;

    public UserException(String message, Throwable throwable, HttpStatus httpStatus) {
        this.message = message;
        this.throwable = throwable;
        this.httpStatus = httpStatus;
    }
}
