package com.crawler.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.crawler.backend.dto.UserDto;

public interface UserService {
    List<UserDto> getUsers(Sort sort);

    UserDto create(UserDto userDto);

    UserDto getUser(Long userId);

    UserDto updateUser(Long userId, UserDto userDto);

    String disableUser(Long userId, String username);

    List<UserDto> searchByUsername(String username, Sort sort);

    Long getUserCount();

    UserDto getUserByUsername(String username);
}