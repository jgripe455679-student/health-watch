package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.UserDto;
import com.crawler.backend.enums.Roles;
import com.crawler.backend.exception.AppException;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.mapper.UserMapper;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.RoleRepository;
import com.crawler.backend.repository.UserRepository;
import com.crawler.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${SYSADMIN_USERNAME}")
    private String sys_admin;

    private Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public UserDto create(UserDto userDto) {
        User user = UserMapper.userDtoToUser(userDto);

        if (userRepository.findByUsername(userDto.username()).isPresent())
            throw new AppException(HttpStatus.CONFLICT, "Username already exist");

        Role role = roleRepository.findByName(userDto.role()).orElseThrow(
                () -> new ResourceNotFoundException("Role not found"));

        User createdBy = userRepository.findByUsername(userDto.createdBy()).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        user.setRole(role);
        user.setPassword(passwordEncoder.encode(userDto.password()));
        user.setCreatedBy(createdBy);
        /**
         * Extra access control in the business logic layer
         */
        Authentication authentication = getAuthentication();

        if (!authentication.getName().equals(userDto.createdBy()))
            throw new AppException(HttpStatus.UNAUTHORIZED, "Full authentication is required to access this resource");

        if (!createdBy.getRole().getName().equals(Roles.ADMIN.name()))
            throw new AppException(HttpStatus.FORBIDDEN, "Access is denied. You do not have the required permissions");

        return UserMapper.userToUserDto(userRepository.save(user));
    }

    @Override
    public List<UserDto> getUsers(Sort sort) {
        /**
         * Extra access control in the business logic layer
         */
        Authentication authentication = getAuthentication();

        if (!authentication.isAuthenticated())
            throw new AppException(HttpStatus.UNAUTHORIZED, "Full authentication is required to access this resource");

        User authenticated_user = userRepository.findByUsername(authentication.getName()).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        if (!authenticated_user.getRole().getName().equals(Roles.ADMIN.name()))
            throw new AppException(HttpStatus.FORBIDDEN, "Access is denied. You do not have the required permissions");

        return userRepository
                .findAll(sort)
                .stream()
                .filter(user -> !sys_admin.equals(user.getUsername()))
                .map(UserMapper::userToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUser(Long userId) {
        /**
         * Extra access control in the business logic layer
         */
        Authentication authentication = getAuthentication();

        if (!authentication.isAuthenticated()) {
            throw new AppException(HttpStatus.UNAUTHORIZED, "Full authentication is required to access this resource");
        }

        User authenticated_user = userRepository.findByUsername(authentication.getName()).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        if (!authenticated_user.getRole().getName().equals(Roles.ADMIN.name())) {
            if (!authenticated_user.getId().equals(userId)) {
                throw new AppException(HttpStatus.FORBIDDEN,
                        "Access is denied. You do not have the required permissions");
            }
        }

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));
        return UserMapper.userToUserDto(user);
    }

    @Override
    public UserDto updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        if (!userDto.username().equals(user.getUsername())) {
            if (userRepository.findByUsername(userDto.username()).isPresent())
                throw new AppException(HttpStatus.CONFLICT, "Username already exist");
        }

        Role role = roleRepository.findByName(userDto.role()).orElseThrow(
                () -> new ResourceNotFoundException("Role not found"));

        User updatedBy = userRepository.findByUsername(userDto.updatedBy()).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        user.setUsername(userDto.username());
        if (!userDto.password().isBlank() || !userDto.password().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDto.password()));
        }
        user.setRole(role);
        user.setUpdatedBy(updatedBy);

        return UserMapper.userToUserDto(userRepository.save(user));
    }

    @Override
    public String disableUser(Long userId, String username) {
        User userToDisable = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        User disabledBy = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        userToDisable.setAccountNonExpired(false);
        userToDisable.setAccountNonLocked(false);
        userToDisable.setCredentialsNonExpired(false);
        userToDisable.setEnabled(false);
        userToDisable.setUpdatedBy(disabledBy);

        userRepository.save(userToDisable);

        return String.format("User with user_id %d disabled successfully", userId);
    }

    @Override
    public List<UserDto> searchByUsername(String username, Sort sort) {
        return userRepository.findByUsernameContaining(username, sort).stream().map(UserMapper::userToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public Long getUserCount() {
        return userRepository.count();
    }

    @Override
    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new ResourceNotFoundException("Username not found"));
        return UserMapper.userToUserDto(user);
    }

}