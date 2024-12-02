package com.crawler.backend.service.implementation;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.TemporalUnit;
import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.crawler.backend.enums.TokenType;
import com.crawler.backend.model.Token;
import com.crawler.backend.service.JWTService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTServiceImplementation implements JWTService {

    private String secretKey = "";

    public JWTServiceImplementation() throws NoSuchAlgorithmException {
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
        SecretKey sk = keyGen.generateKey();
        secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
    }

    @Override
    public Token generateAccessToken(Map<String, Object> extraClaims, long duration, TemporalUnit durationType,
            UserDetails user) {

        String username = user.getUsername();

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiryDate = now.plus(duration, durationType);

        String token = Jwts.builder()
                .claims()
                .add(extraClaims)
                .subject(username)
                .issuedAt(toDate(now))
                .expiration(toDate(expiryDate))
                .and()
                .signWith(getKey())
                .compact();

        return new Token(0L, TokenType.ACCESS, token, expiryDate, false, null);
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public boolean validateToken(String token) {
        if (token == null) {
            return false;
        }
        try {
            Jwts
                    .parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    @Override
    public Token generateRefreshToken(long duration, TemporalUnit durationType, UserDetails user) {
        String username = user.getUsername();

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiryDate = now.plus(duration, durationType);

        String token = Jwts.builder()
                .claims()
                .subject(username)
                .issuedAt(toDate(now))
                .expiration(toDate(expiryDate))
                .and()
                .signWith(getKey())
                .compact();

        return new Token(0L, TokenType.REFRESH, token, expiryDate, false, null);
    }

    public LocalDateTime extractExpiration(String token) {
        return toLocalDateTime(extractClaim(token, Claims::getExpiration));
    }

    private LocalDateTime toLocalDateTime(Date date) {
        ZoneOffset zoneOffset = ZoneOffset.UTC;
        return date.toInstant().atOffset(zoneOffset).toLocalDateTime();
    }

    private Date toDate(LocalDateTime localDateTime) {
        ZoneOffset zoneOffset = ZoneOffset.UTC;
        return Date.from(localDateTime.toInstant(zoneOffset));
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
