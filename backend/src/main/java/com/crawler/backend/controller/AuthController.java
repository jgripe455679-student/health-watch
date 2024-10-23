package com.crawler.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.dto.AuthResponseDTO;
import com.crawler.backend.dto.RefreshTokenDTO;
import com.crawler.backend.dto.UserLoginDTO;
import com.crawler.backend.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid UserLoginDTO userLoginDTO) {
        return ResponseEntity.ok(authService.verifyUser(userLoginDTO));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(@RequestBody @Valid RefreshTokenDTO refreshTokenDTO) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenDTO));
    }

}
