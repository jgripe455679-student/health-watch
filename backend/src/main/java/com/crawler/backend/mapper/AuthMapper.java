package com.crawler.backend.mapper;

import com.crawler.backend.dto.LoginDto;
import com.crawler.backend.dto.LoginRequestDto;

public class AuthMapper {
    public static LoginDto loginRequestDtoToLoginDto(LoginRequestDto loginRequestDto) {
        return new LoginDto(
                loginRequestDto.getUsername(),
                loginRequestDto.getPassword());
    }
}