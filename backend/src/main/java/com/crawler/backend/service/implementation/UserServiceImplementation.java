package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.UserDTO;
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
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = UserMapper.userDTOToUser(userDTO);

        Role role = roleRepository.findByName(userDTO.role()).orElseThrow(
                () -> new ResourceNotFoundException("Role not found"));
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(userDTO.password()));

        return UserMapper.userToUserDTO(userRepository.save(user));
    }

    @Override
    public String deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);

        return String.format("User with %d deleted successfully", userId);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper::userToUserDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));
        return UserMapper.userToUserDTO(user);
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        Role role = roleRepository.findByName(userDTO.role()).orElseThrow(
                () -> new ResourceNotFoundException("Role not found"));

        user.setUsername(userDTO.username());
        user.setPassword(passwordEncoder.encode(userDTO.password()));
        user.setRole(role);
        return UserMapper.userToUserDTO(userRepository.save(user));
    }

}