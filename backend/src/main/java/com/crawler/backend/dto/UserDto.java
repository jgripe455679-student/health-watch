package com.crawler.backend.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

public record UserDto(Long id, String username, String password, String role, Set<String> permissions,
        LocalDateTime createdAt, String createdBy, LocalDateTime updatedAt, String updatedBy,
        boolean isAccountNonExpired,
        boolean isAccountNonLocked,
        boolean isCredentialsNonExpired, boolean isEnabled)
        implements Serializable {

}
