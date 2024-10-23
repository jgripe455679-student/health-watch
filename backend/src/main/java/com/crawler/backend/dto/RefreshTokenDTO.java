package com.crawler.backend.dto;

public class RefreshTokenDTO {
    private String refreshToken;

    public RefreshTokenDTO(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public RefreshTokenDTO() {

    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String token) {
        this.refreshToken = token;
    }
}
