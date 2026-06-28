package com.crawler.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.crawler.backend.dto.UserDto;
import com.crawler.backend.dto.UserResponseDto;

public interface UserService {
    List<UserResponseDto> getUsers(Sort sort);

    UserResponseDto create(UserDto userDto);

    UserResponseDto getUser(Long userId);

    UserResponseDto updateUser(Long userId, UserDto userDto);

    String disableUser(Long userId, String username);

    List<UserResponseDto> searchByUsername(String username, Sort sort);

    Long getUserCount();

    UserResponseDto getUserByUsername(String username);
}