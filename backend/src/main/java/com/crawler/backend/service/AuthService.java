package com.crawler.backend.service;

import org.springframework.http.ResponseEntity;

import com.crawler.backend.dto.AuthResponseDTO;
import com.crawler.backend.dto.LoginRequestDTO;
import com.crawler.backend.dto.UserLoggedDTO;

public interface AuthService {
    // public AuthResponseDTO verifyUser(UserLoginDTO userLoginDTO);
    // public AuthResponseDTO refreshToken(RefreshTokenDTO refreshTokenDTO);
    ResponseEntity<AuthResponseDTO> login(LoginRequestDTO loginRequest, String accessToken, String refreshToken);
    ResponseEntity<AuthResponseDTO> refresh(String refreshToken);
    ResponseEntity<AuthResponseDTO> logout(String accessToken, String refreshToken);
    UserLoggedDTO getUserLoggedInfo();
}
