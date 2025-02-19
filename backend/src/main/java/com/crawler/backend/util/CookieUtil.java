package com.crawler.backend.util;

import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import com.crawler.backend.config.JwtProperties;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CookieUtil {
    // @Value("${JWT_ACCESS_COOKIE_NAME}")
    // private String accessTokenCookieName;
    // @Value("${JWT_REFRESH_COOKIE_NAME}")
    // private String refreshTokenCookieName;
    
    private final JwtProperties jwtProperties;

    public HttpCookie createAccessTokenCookie(String accessToken, long duration) {
        return ResponseCookie.from(jwtProperties.getAccessCookieName(), accessToken)
                .maxAge(duration)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .build();
    }

    public HttpCookie createRefreshTokenCookie(String refreshToken, long duration) {
        return ResponseCookie.from(jwtProperties.getRefreshCookieName(), refreshToken)
                .maxAge(duration)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .build();
    }

    public HttpCookie deleteAccessTokenCookie() {
        return ResponseCookie.from(jwtProperties.getAccessCookieName(), "")
                .maxAge(0)
                .httpOnly(true)
                .path("/")
                .build();
    }

    public HttpCookie deleteRefreshTokenCookie() {
        return ResponseCookie.from(jwtProperties.getRefreshCookieName(), "")
                .maxAge(0)
                .httpOnly(true)
                .path("/")
                .build();
    }
}
