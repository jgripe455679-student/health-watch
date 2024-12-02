package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.UserDto;
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

    @Override
    public UserDto create(UserDto userDto) {
        User user = UserMapper.userDtoToUser(userDto);

        if (userRepository.findByUsername(user.getUsername()).isPresent())
            throw new AppException(HttpStatus.CONFLICT, "Username already exist");

        Role role = roleRepository.findByName(userDto.role()).orElseThrow(
                () -> new ResourceNotFoundException("Role not found"));

        user.setRole(role);
        user.setPassword(passwordEncoder.encode(userDto.password()));

        return UserMapper.userToUserDto(userRepository.save(user));
    }

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().map(UserMapper::userToUserDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));
        return UserMapper.userToUserDto(user);
    }

    @Override
    public UserDto updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        Role role = roleRepository.findByName(userDto.role()).orElseThrow(
                () -> new ResourceNotFoundException("Role not found"));

        user.setUsername(userDto.username());
        user.setPassword(passwordEncoder.encode(userDto.password()));
        user.setRole(role);

        return UserMapper.userToUserDto(userRepository.save(user));
    }

    @Override
    public String deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);
        return String.format("User with %d deleted successfully", userId);
    }

    @Override
    public List<UserDto> searchByUsername(String username) {
        return userRepository.findByUsernameContaining(username).stream().map(UserMapper::userToUserDto)
                .collect(Collectors.toList());
    }

}