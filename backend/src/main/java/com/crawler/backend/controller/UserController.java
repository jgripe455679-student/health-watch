package com.crawler.backend.controller;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.dto.UserDto;
import com.crawler.backend.dto.UserRequestDto;
import com.crawler.backend.exception.AppException;
import com.crawler.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private static final Pattern PASSWORD_POLICY = Pattern.compile("^(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$");

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserRequestDto userRequestDto) {
        /*
         * Validate incoming web request
         */
        int minPasswordLength = 8;
        int maxPasswordLength = 64;

        if (userRequestDto.password().length() < minPasswordLength
                || userRequestDto.password().length() > maxPasswordLength) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters long");
        }

        if (!PASSWORD_POLICY.matcher(userRequestDto.password()).matches()) {
            throw new AppException(HttpStatus.BAD_REQUEST,
                    "Password must include at least one digit, one uppercase letter, and one symbol");
        }

        if (!userRequestDto.password().equals(userRequestDto.confirmPassword())) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Passwords do not match");
        }
        /*
         * Proceed with the operation
         */
        UserDto response = userService.create(userRequestDto);
        return ResponseEntity.created(URI.create("/api/v1/users/" + response.id())).body(response);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers() {
        return ResponseEntity.ok(userService.getUsers(Sort.by(Sort.Direction.DESC, "createdAt")));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long userId) {
        UserDto response = userService.getUser(userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long userId,
            @RequestBody UserDto userDto) {
        UserDto response = userService.updateUser(userId, userDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> disableUser(
            @PathVariable Long userId, Principal principal) {
        String username = principal.getName();
        String response = userService.disableUser(userId, username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchByUsername(@RequestParam String username) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<UserDto> users = userService.searchByUsername(username, sort);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userService.getUserCount());
    }

    @GetMapping("/username")
    public ResponseEntity<UserDto> getUserByUsername(@RequestParam String username) {
        UserDto response = userService.getUserByUsername(username);
        return ResponseEntity.ok(response);
    }

}