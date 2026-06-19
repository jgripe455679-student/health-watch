package com.crawler.backend.dto;

import java.io.Serializable;

public record UserRequestDto(String username, String password, String confirmPassword, String role, String createdBy)
        implements Serializable {

}