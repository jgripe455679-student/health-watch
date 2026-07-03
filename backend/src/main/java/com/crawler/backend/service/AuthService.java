package com.crawler.backend.service;

import org.springframework.http.ResponseEntity;

import com.crawler.backend.dto.LoginRequestDto;
import com.crawler.backend.dto.LoginResponseDto;
import com.crawler.backend.dto.UserLoggedDto;

public interface AuthService {
    ResponseEntity<LoginResponseDto> login(LoginRequestDto loginRequestDto, String accessToken, String refreshToken);

    ResponseEntity<LoginResponseDto> refresh(String refreshToken);

    ResponseEntity<LoginResponseDto> logout(String accessToken, String refreshToken);

    UserLoggedDto getUserLoggedInfo();
}
