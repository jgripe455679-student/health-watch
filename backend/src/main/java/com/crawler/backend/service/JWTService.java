package com.crawler.backend.service;

import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
    public String generateToken(String username);

    public String extractUsername(String token);

    public boolean validateToken(String token, UserDetails userDetails);

    public String generateRefreshToken(Map<String, Object> extraClaims, String username);
}
