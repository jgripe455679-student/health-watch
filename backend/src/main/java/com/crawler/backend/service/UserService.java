package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.model.User;

public interface UserService {
    public String createUser(User user);
    public String updateUser(User user);
    public String deleteUser(int userId);
    public User getUser(int userId);
    public List<User> getAllUsers();
}