package com.crawler.backend.mapper;

import java.util.stream.Collectors;

import com.crawler.backend.dto.UserDto;
import com.crawler.backend.dto.UserLoggedDto;
import com.crawler.backend.dto.UserRequestDto;
import com.crawler.backend.dto.UserResponseDto;
import com.crawler.backend.model.Permission;
import com.crawler.backend.model.User;

public class UserMapper {
    public static UserResponseDto userToUserResponseDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getUsername(),
                user.getRole().getName(),
                user.getCreatedAt(),
                user.getCreatedBy() != null ? user.getCreatedBy().getUsername() : null,
                user.getUpdatedAt(),
                user.getUpdatedBy() != null ? user.getUpdatedBy().getUsername() : null,
                user.isAccountNonExpired(),
                user.isAccountNonLocked(),
                user.isCredentialsNonExpired(),
                user.isEnabled());
    }

    public static User userDtoToUser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.username());
        return user;
    }

    public static UserDto userRequestDtoToUserDto(UserRequestDto userRequestDto) {
        return new UserDto(
                userRequestDto.getUsername(),
                userRequestDto.getPassword(),
                userRequestDto.getRole(),
                userRequestDto.getCreatedBy(),
                userRequestDto.getUpdatedBy() != null ? userRequestDto.getUpdatedBy() : null);
    }

    public static UserLoggedDto userToUserLoggedDto(User user) {
        return new UserLoggedDto(user.getUsername(), user.getRole().getAuthority(),
                user.getRole().getPermissions().stream().map(Permission::getAuthority).collect(Collectors.toSet()));
    }

}
