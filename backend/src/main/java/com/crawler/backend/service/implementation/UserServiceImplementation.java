package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.UserDto;
import com.crawler.backend.exception.AppException;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.mapper.UserMapper;
import com.crawler.backend.model.Profile;
import com.crawler.backend.model.Record;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.ProfileRepository;
import com.crawler.backend.repository.RecordRepository;
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
    private final ProfileRepository profileRepository;
    private final RecordRepository recordRepository;

    @Override
    public UserDto create(UserDto userDto) {
        User user = UserMapper.userDtoToUser(userDto);

        if (userRepository.findByUsername(user.getUsername()).isPresent())
            throw new AppException(HttpStatus.CONFLICT, "Username already exist");

        Role role = roleRepository.findByName(userDto.role()).orElseThrow(
                () -> new ResourceNotFoundException("Role not found"));

        User createdBy = userRepository.findByUsername(userDto.createdBy()).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        user.setRole(role);
        user.setPassword(passwordEncoder.encode(userDto.password()));
        user.setCreatedBy(createdBy);

        return UserMapper.userToUserDto(userRepository.save(user));
    }

    @Override
    public List<UserDto> getUsers(Sort sort) {
        return userRepository
                .findAll(sort)
                .stream()
                .filter(user -> !"sys_admin".equals(user.getUsername()))
                .map(UserMapper::userToUserDto)
                .collect(Collectors.toList());
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
    public String deleteUser(Long userId) {
        User userToDelete = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        User defaultUser = userRepository.findByUsername("sys_admin").orElseThrow(
                () -> new ResourceNotFoundException("User not found"));

        // User entity
        List<User> referencingUsersForCreatedBy = userRepository.findByCreatedBy(userToDelete);
        for (User user : referencingUsersForCreatedBy) {
            user.setCreatedBy(defaultUser);
            userRepository.save(user);
        }

        List<User> referencingUsersForUpdatedBy = userRepository.findByUpdatedBy(userToDelete);
        for (User user : referencingUsersForUpdatedBy) {
            user.setUpdatedBy(defaultUser);
            userRepository.save(user);
        }

        // Profile entity
        List<Profile> referencingProfilesForCreatedBy = profileRepository.findByCreatedBy(userToDelete);
        for (Profile profile : referencingProfilesForCreatedBy) {
            profile.setCreatedBy(defaultUser);
            profileRepository.save(profile);
        }

        List<Profile> referencingProfilesForUpdatedBy = profileRepository.findByUpdatedBy(userToDelete);
        for (Profile profile : referencingProfilesForUpdatedBy) {
            profile.setUpdatedBy(defaultUser);
            profileRepository.save(profile);
        }

        // Record entity
        List<Record> referencingRecordsForCreatedBy = recordRepository.findByCreatedBy(userToDelete);
        for (Record record : referencingRecordsForCreatedBy) {
            record.setCreatedBy(defaultUser);
            recordRepository.save(record);
        }

        List<Record> referencingRecordsForUpdatedBy = recordRepository.findByUpdatedBy(userToDelete);
        for (Record record : referencingRecordsForUpdatedBy) {
            record.setUpdatedBy(defaultUser);
            recordRepository.save(record);
        }

        userRepository.delete(userToDelete);
        return String.format("User with %d deleted successfully", userId);
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