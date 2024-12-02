package com.crawler.backend.dto;

public record LoginResponse(
                boolean isLogged,
                String role) {
}
