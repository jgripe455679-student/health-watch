package com.crawler.backend.dto;

public record LoginResponseDto(
                boolean isLogged,
                String role) {
}
