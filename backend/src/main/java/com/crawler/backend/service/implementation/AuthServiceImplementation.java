package com.crawler.backend.service.implementation;

import java.util.HashMap;

import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.AuthResponseDTO;
import com.crawler.backend.dto.RefreshTokenDTO;
import com.crawler.backend.dto.UserLoginDTO;
import com.crawler.backend.service.AuthService;
import com.crawler.backend.service.JWTService;

@Service
public class AuthServiceImplementation implements AuthService {

    private final AuthenticationManager authManager;
    private final JWTService jwtService;
    ApplicationContext context;

    public AuthServiceImplementation(AuthenticationManager authManager, JWTService jwtService,
            ApplicationContext context) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.context = context;
    }

    @Override
    public AuthResponseDTO verifyUser(UserLoginDTO userLoginDTO) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                userLoginDTO.getUsername(), userLoginDTO.getPassword()));
        if (authentication.isAuthenticated()) {
            String accessToken = jwtService.generateToken(userLoginDTO.getUsername());
            String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), userLoginDTO.getUsername());
            AuthResponseDTO authResponse = new AuthResponseDTO();
            authResponse.setAccessToken(accessToken);
            authResponse.setRefreshToken(refreshToken);
            return authResponse;
        }
        return new AuthResponseDTO("", "");
    }

    @Override
    public AuthResponseDTO refreshToken(RefreshTokenDTO refreshTokenDTO) {
        String username = jwtService.extractUsername(refreshTokenDTO.getRefreshToken());
        UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(username);
        if (jwtService.validateToken(refreshTokenDTO.getRefreshToken(), userDetails)) {
            String accessToken = jwtService.generateToken(username);
            AuthResponseDTO authResponse = new AuthResponseDTO();
            authResponse.setAccessToken(accessToken);
            authResponse.setRefreshToken(refreshTokenDTO.getRefreshToken());
            return authResponse;
        }
        return new AuthResponseDTO("", "");
    }

}
