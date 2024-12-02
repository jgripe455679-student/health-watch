package com.crawler.backend.mapper;

import java.util.stream.Collectors;

import com.crawler.backend.dto.UserDto;
import com.crawler.backend.dto.UserLoggedDto;
import com.crawler.backend.model.Permission;
import com.crawler.backend.model.User;

public class UserMapper {
    public static UserDto userToUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole().getAuthority(),
                user.getRole().getPermissions().stream().map(Permission::getAuthority).collect(Collectors.toSet()),
                user.getCreatedAt(),
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

    public static UserLoggedDto userToUserLoggedDto(User user) {
        return new UserLoggedDto(user.getUsername(), user.getRole().getAuthority(),
                user.getRole().getPermissions().stream().map(Permission::getAuthority).collect(Collectors.toSet()));
    }

}
