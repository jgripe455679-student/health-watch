package com.crawler.backend.service;

import java.time.LocalDateTime;
import java.time.temporal.TemporalUnit;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;

import com.crawler.backend.model.Token;

public interface JWTService {
    public Token generateAccessToken(Map<String, Object> extraClaims, long duration, TemporalUnit durationType,
            UserDetails userDetails);

    public String extractUsername(String token);

    public LocalDateTime extractExpiration(String token);

    public boolean validateToken(String token);

    public Token generateRefreshToken(long duration, TemporalUnit durationType, UserDetails userDetails);
}
