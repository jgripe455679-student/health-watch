package com.crawler.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.model.User;
import com.crawler.backend.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    @Autowired
    UserService userService;
    
    @PostMapping
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }
    
}