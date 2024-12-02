package com.crawler.backend.service;

import org.springframework.http.ResponseEntity;

import com.crawler.backend.dto.LoginRequest;
import com.crawler.backend.dto.LoginResponse;
import com.crawler.backend.dto.UserLoggedDto;

public interface AuthService {
    public ResponseEntity<LoginResponse> login(LoginRequest loginRequest, String accessToken, String refreshToken);

    public ResponseEntity<LoginResponse> refresh(String refreshToken);

    public ResponseEntity<LoginResponse> logout(String accessToken, String refreshToken);

    public UserLoggedDto getUserLoggedInfo();
}
