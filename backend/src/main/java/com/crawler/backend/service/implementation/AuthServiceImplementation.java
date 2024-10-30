package com.crawler.backend.service.implementation;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.AuthResponseDTO;
import com.crawler.backend.dto.LoginRequestDTO;
import com.crawler.backend.dto.UserLoggedDTO;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.exception.UserException;
import com.crawler.backend.mapper.UserMapper;
import com.crawler.backend.model.Token;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.TokenRepository;
import com.crawler.backend.repository.UserRepository;
import com.crawler.backend.service.AuthService;
import com.crawler.backend.service.JWTService;
import com.crawler.backend.util.CookieUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplementation implements AuthService {

    @Value("${JWT_ACCESS_TOKEN_DURATION_MINUTE}")
    private long accessTokenDurationMinute;
    @Value("${JWT_ACCESS_TOKEN_DURATION_SECOND}")
    private long accessTokenDurationSecond;
    @Value("${JWT_REFRESH_TOKEN_DURATION_DAY}")
    private long refreshTokenDurationDay;
    @Value("${JWT_REFRESH_TOKEN_DURATION_SECOND}")
    private long refreshTokenDurationSecond;
    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final CookieUtil cookieUtil;
    private final JWTService jwtService;
    ApplicationContext context;

    @Override
    public ResponseEntity<AuthResponseDTO> login(LoginRequestDTO loginRequest, String accessToken,
            String refreshToken) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));
        String username = loginRequest.username();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        boolean accessTokenValid = jwtService.validateToken(accessToken);
        boolean refreshTokenValid = jwtService.validateToken(refreshToken);

        HttpHeaders responseHeaders = new HttpHeaders();
        Token newAccessToken, newRefreshToken;

        revokeAllTokenOfUser(user);

        if (!accessTokenValid && !refreshTokenValid) {
            newAccessToken = jwtService.generateAccessToken(Map.of("role", user.getRole().getAuthority()),
                    accessTokenDurationMinute, ChronoUnit.MINUTES, user);

            newRefreshToken = jwtService.generateRefreshToken(refreshTokenDurationDay, ChronoUnit.DAYS, user);

            newAccessToken.setUser(user);
            newRefreshToken.setUser(user);

            tokenRepository.saveAll(List.of(newAccessToken, newRefreshToken));

            addAccessTokenCookie(responseHeaders, newAccessToken);
            addRefreshTokenCookie(responseHeaders, newRefreshToken);

        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        AuthResponseDTO authResponseDTO = new AuthResponseDTO(true, user.getId());

        return ResponseEntity.ok().headers(responseHeaders).body(authResponseDTO);
    }

    @Override
    public ResponseEntity<AuthResponseDTO> refresh(String refreshToken) {
        boolean refreshTokenValid = jwtService.validateToken(refreshToken);

        if (!refreshTokenValid) {
            throw new UserException("Refresh token is invalid", null, HttpStatus.BAD_REQUEST);
        }
        String username = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        Token newAccessToken = jwtService.generateAccessToken(
                Map.of("role", user.getRole().getAuthority()),
                accessTokenDurationMinute,
                ChronoUnit.MINUTES,
                user);

        HttpHeaders responseHeaders = new HttpHeaders();
        addAccessTokenCookie(responseHeaders, newAccessToken);

        AuthResponseDTO authResponseDTO = new AuthResponseDTO(true, user.getId());

        return ResponseEntity.ok().headers(responseHeaders).body(authResponseDTO);
    }

    @Override
    public ResponseEntity<AuthResponseDTO> logout(String accessToken, String refreshToken) {
        SecurityContextHolder.clearContext();

        String username = jwtService.extractUsername(accessToken);
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        revokeAllTokenOfUser(user);

        HttpHeaders responseHeaders = new HttpHeaders();

        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.deleteAccessTokenCookie().toString());
        responseHeaders.add(HttpHeaders.SET_COOKIE, cookieUtil.deleteRefreshTokenCookie().toString());

        AuthResponseDTO authResponseDTO = new AuthResponseDTO(false, null);

        return ResponseEntity.ok().headers(responseHeaders).body(authResponseDTO);
    }

    @Override
    public UserLoggedDTO getUserLoggedInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new UserException("No user authenticated", null, HttpStatus.UNAUTHORIZED);
        }

        String username = authentication.getName();

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        return UserMapper.userToUserLoggedDTO(user);
    }

    private void addAccessTokenCookie(HttpHeaders httpHeaders, Token token) {
        httpHeaders.add(HttpHeaders.SET_COOKIE,
                cookieUtil.createAccessTokenCookie(token.getValue(), accessTokenDurationSecond).toString());
    }

    private void addRefreshTokenCookie(HttpHeaders httpHeaders, Token token) {
        httpHeaders.add(HttpHeaders.SET_COOKIE,
                cookieUtil.createRefreshTokenCookie(token.getValue(), refreshTokenDurationSecond).toString());
    }

    private void revokeAllTokenOfUser(User user) {
        Set<Token> tokens = user.getTokens();

        tokens.forEach(token -> {
            if (token.getExpiryDate().isBefore(LocalDateTime.now()))
                tokenRepository.delete(token);
            else if (!token.isDisabled()) {
                token.setDisabled(true);
                tokenRepository.save(token);
            }
        });
    }
    // @Override
    // public AuthResponseDTO verifyUser(UserLoginDTO userLoginDTO) {
    // Authentication authentication = authManager.authenticate(new
    // UsernamePasswordAuthenticationToken(
    // userLoginDTO.getUsername(), userLoginDTO.getPassword()));
    // if (authentication.isAuthenticated()) {
    // String accessToken = jwtService.generateToken(userLoginDTO.getUsername());
    // String refreshToken = jwtService.generateRefreshToken(new HashMap<>(),
    // userLoginDTO.getUsername());
    // AuthResponseDTO authResponse = new AuthResponseDTO();
    // authResponse.setAccessToken(accessToken);
    // authResponse.setRefreshToken(refreshToken);
    // return authResponse;
    // }
    // return new AuthResponseDTO("", "");
    // }

    // @Override
    // public AuthResponseDTO refreshToken(RefreshTokenDTO refreshTokenDTO) {
    // String username =
    // jwtService.extractUsername(refreshTokenDTO.getRefreshToken());
    // UserDetails userDetails =
    // context.getBean(MyUserDetailsService.class).loadUserByUsername(username);
    // if (jwtService.validateToken(refreshTokenDTO.getRefreshToken(), userDetails))
    // {
    // String accessToken = jwtService.generateToken(username);
    // AuthResponseDTO authResponse = new AuthResponseDTO();
    // authResponse.setAccessToken(accessToken);
    // authResponse.setRefreshToken(refreshTokenDTO.getRefreshToken());
    // return authResponse;
    // }
    // return new AuthResponseDTO("", "");
    // }

}
