package com.crawler.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.dto.UserDTO;
import com.crawler.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserDetails(@PathVariable(name = "userId") Long userId) {
        UserDTO response = userService.getUser(userId);
        return ResponseEntity.ok(response);
    }

    // @PutMapping("/user/{userId}")
    // public ResponseEntity<?> updateUser(@PathVariable int userId, @RequestBody
    // UserUpdateDTO userUpdateRequest) {
    // if (userUpdateRequest.getPassword() != null ||
    // userUpdateRequest.getRetypePassword() != null) {
    // if
    // (!userUpdateRequest.getPassword().equals(userUpdateRequest.getRetypePassword()))
    // {
    // return ResponseEntity.badRequest().body("Passwords do not match");
    // }
    // }
    // userService.updateUser(userId, userUpdateRequest);
    // return ResponseEntity.ok().body("User updated successfully");
    // }

}