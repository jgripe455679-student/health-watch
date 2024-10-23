package com.crawler.backend.service;

import com.crawler.backend.dto.AuthResponseDTO;
import com.crawler.backend.dto.RefreshTokenDTO;
import com.crawler.backend.dto.UserLoginDTO;

public interface AuthService {
    public AuthResponseDTO verifyUser(UserLoginDTO userLoginDTO);
    public AuthResponseDTO refreshToken(RefreshTokenDTO refreshTokenDTO);
}
