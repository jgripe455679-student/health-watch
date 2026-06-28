package com.crawler.backend.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public record UserResponseDto(Long id, String username, String role, LocalDateTime createdAt, String createdBy,
        LocalDateTime updatedAt, String updatedBy, boolean isAccountNonExpired, boolean isAccountNonLocked,
        boolean isCredentialsNonExpired, boolean isEnabled) implements Serializable {
}