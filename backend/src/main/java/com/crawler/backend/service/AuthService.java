package com.crawler.backend.service;

import org.springframework.http.ResponseEntity;

import com.crawler.backend.dto.LoginRequest;
import com.crawler.backend.dto.LoginResponse;
import com.crawler.backend.dto.UserLoggedDto;

public interface AuthService {
    ResponseEntity<LoginResponse> login(LoginRequest loginRequest, String accessToken, String refreshToken);

    ResponseEntity<LoginResponse> refresh(String refreshToken);

    ResponseEntity<LoginResponse> logout(String accessToken, String refreshToken);

    UserLoggedDto getUserLoggedInfo();
}
