package com.crawler.backend.mapper;

import java.util.stream.Collectors;

import com.crawler.backend.dto.UserDTO;
import com.crawler.backend.dto.UserLoggedDTO;
import com.crawler.backend.model.Permission;
import com.crawler.backend.model.User;

public class UserMapper {
    public static UserDTO userToUserDTO(User user) {
        return new UserDTO(user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole().getAuthority(),
                user.getRole().getPermissions().stream().map(Permission::getAuthority).collect(Collectors.toSet()));
    }

    public static User userDTOToUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.username());
        return user;
    }

    public static UserLoggedDTO userToUserLoggedDTO(User user) {
        return new UserLoggedDTO(
                user.getUsername(),
                user.getRole().getAuthority(),
                user.getRole().getPermissions().stream().map(Permission::getAuthority).collect(Collectors.toSet()));
    }
}
