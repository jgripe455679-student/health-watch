package com.crawler.backend.service.implementation;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.crawler.backend.config.JwtProperties;
import com.crawler.backend.dto.LoginRequest;
import com.crawler.backend.dto.LoginResponse;
import com.crawler.backend.dto.UserLoggedDto;
import com.crawler.backend.exception.AppException;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.mapper.UserMapper;
import com.crawler.backend.model.Token;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.TokenRepository;
import com.crawler.backend.repository.UserRepository;
import com.crawler.backend.service.AuthService;
import com.crawler.backend.service.JWTService;
import com.crawler.backend.util.CookieUtil;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplementation implements AuthService {

    @PersistenceContext
    private EntityManager entityManager;

    private final JwtProperties jwtProperties;

    // @Value("${JWT_ACCESS_TOKEN_DURATION_MINUTE}")
    // private long accessTokenDurationMinute;
    // @Value("${JWT_ACCESS_TOKEN_DURATION_SECOND}")
    // private long accessTokenDurationSecond;
    // @Value("${JWT_REFRESH_TOKEN_DURATION_DAY}")
    // private long refreshTokenDurationDay;
    // @Value("${JWT_REFRESH_TOKEN_DURATION_SECOND}")
    // private long refreshTokenDurationSecond;

    private final AuthenticationManager authManager;
    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final CookieUtil cookieUtil;

    @Override
    public ResponseEntity<LoginResponse> login(LoginRequest loginRequest, String accessToken, String refreshToken) {

        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.username(), loginRequest.password()));

        String username = loginRequest.username();

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        boolean accessTokenValid = jwtService.validateToken(accessToken);
        boolean refreshTokenValid = jwtService.validateToken(refreshToken);

        HttpHeaders responseHeaders = new HttpHeaders();
        Token newAccessToken, newRefreshToken;

        revokeAllTokenOfUser(user);

        if (!accessTokenValid && !refreshTokenValid) {
            newAccessToken = jwtService.generateAccessToken(
                    Map.of("role", user.getRole().getAuthority()),
                    jwtProperties.getAccessTokenDurationMinute(),
                    ChronoUnit.MINUTES,
                    user);

            newRefreshToken = jwtService.generateRefreshToken(
                    jwtProperties.getRefreshTokenDurationDay(),
                    ChronoUnit.DAYS,
                    user);

            newAccessToken.setUser(user);
            newRefreshToken.setUser(user);

            tokenRepository.saveAll(List.of(newAccessToken, newRefreshToken));

            addAccessTokenCookie(responseHeaders, newAccessToken);
            addRefreshTokenCookie(responseHeaders, newRefreshToken);
        }

        if (!accessTokenValid && refreshTokenValid) {
            newAccessToken = jwtService.generateAccessToken(Map.of("role", user.getRole().getAuthority()),
                    jwtProperties.getAccessTokenDurationMinute(),
                    ChronoUnit.MINUTES,
                    user);

            addAccessTokenCookie(responseHeaders, newAccessToken);
        }

        if (accessTokenValid && refreshTokenValid) {
            newAccessToken = jwtService.generateAccessToken(
                    Map.of("role", user.getRole().getAuthority()),
                    jwtProperties.getAccessTokenDurationMinute(),
                    ChronoUnit.MINUTES,
                    user);

            newRefreshToken = jwtService.generateRefreshToken(jwtProperties.getRefreshTokenDurationDay(),
                    ChronoUnit.DAYS,
                    user);

            newAccessToken.setUser(user);
            newRefreshToken.setUser(user);

            tokenRepository.saveAll(List.of(newAccessToken, newRefreshToken));

            addAccessTokenCookie(responseHeaders, newAccessToken);
            addRefreshTokenCookie(responseHeaders, newRefreshToken);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        LoginResponse loginResponse = new LoginResponse(true, user.getRole().getName());

        return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
    }

    @Override
    public ResponseEntity<LoginResponse> refresh(String refreshToken) {
        boolean refreshTokenValid = jwtService.validateToken(refreshToken);

        if (!refreshTokenValid) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Refresh token is invalid");
        }

        String username = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        Token newAccessToken = jwtService.generateAccessToken(Map.of("role", user.getRole().getAuthority()),
                jwtProperties.getAccessTokenDurationMinute(), ChronoUnit.MINUTES, user);

        HttpHeaders responseHeaders = new HttpHeaders();
        addAccessTokenCookie(responseHeaders, newAccessToken);

        LoginResponse loginResponse = new LoginResponse(true, user.getRole().getName());

        return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
    }

    @Override
    public ResponseEntity<LoginResponse> logout(String accessToken, String refreshToken) {
        SecurityContextHolder.clearContext();

        String username = jwtService.extractUsername(accessToken);
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        revokeAllTokenOfUser(user);

        HttpHeaders responseHeaders = new HttpHeaders();

        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.deleteAccessTokenCookie().toString());
        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.deleteRefreshTokenCookie().toString());

        LoginResponse loginResponse = new LoginResponse(false, null);
        return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
    }

    @Override
    public UserLoggedDto getUserLoggedInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new AppException(HttpStatus.UNAUTHORIZED, "No user authenticated");
        }

        String username = authentication.getName();

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        return UserMapper.userToUserLoggedDto(user);
    }

    private void addAccessTokenCookie(HttpHeaders httpHeaders, Token token) {
        httpHeaders.add(
                HttpHeaders.SET_COOKIE,
                cookieUtil.createAccessTokenCookie(token.getValue(), jwtProperties.getAccessTokenDurationSecond())
                        .toString());
    }

    private void addRefreshTokenCookie(HttpHeaders httpHeaders, Token token) {
        httpHeaders.add(
                HttpHeaders.SET_COOKIE,
                cookieUtil.createRefreshTokenCookie(token.getValue(), jwtProperties.getRefreshTokenDurationSecond())
                        .toString());
    }

    private void revokeAllTokenOfUser(User user) {
        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
        Set<Token> tokens = user.getTokens();

        if (!tokens.isEmpty()) {
            tokens.forEach(token -> {
                if (token.getExpiryUtc().isBefore(now)) {
                    tokenRepository.delete(token);
                } else if (!token.isDisabled()) {
                    token.setDisabled(true);
                    tokenRepository.save(token);
                }
            });
        }
    }

}
