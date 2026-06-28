package com.crawler.backend.dto;

import java.io.Serializable;

public record UserDto(String username, String password, String role, String createdBy, String updatedBy)
        implements Serializable {
}
