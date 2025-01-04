package com.crawler.backend.service;

import java.time.LocalDateTime;
import java.time.temporal.TemporalUnit;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;

import com.crawler.backend.model.Token;

public interface JWTService {
    Token generateAccessToken(Map<String, Object> extraClaims, long duration, TemporalUnit durationType,
            UserDetails userDetails);

    String extractUsername(String token);

    LocalDateTime extractExpiration(String token);

    boolean validateToken(String token);

    Token generateRefreshToken(long duration, TemporalUnit durationType, UserDetails userDetails);
}
