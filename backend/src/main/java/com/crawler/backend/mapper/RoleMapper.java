package com.crawler.backend.mapper;

import java.util.stream.Collectors;

import com.crawler.backend.dto.RoleDto;
import com.crawler.backend.model.Permission;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;

public class RoleMapper {
    public static RoleDto roleToRoleDto(Role role) {
        return new RoleDto(
                role.getId(),
                role.getName(),
                role.getAuthority(),
                role.getUsers().stream().map(User::getId).collect(Collectors.toSet()),
                role.getPermissions().stream().map(Permission::getAuthority).collect(Collectors.toSet()));
    }
}
