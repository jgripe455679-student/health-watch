package com.crawler.backend.dto;

import java.util.Set;

public record UserLoggedDTO(String username, String role, Set<String> permissions) {
    
}
