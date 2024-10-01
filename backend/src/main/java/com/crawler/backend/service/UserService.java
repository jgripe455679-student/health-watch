package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.dto.UserDetails;
import com.crawler.backend.dto.UserUpdateRequest;
import com.crawler.backend.model.User;

public interface UserService {
    public void createUser(User user);
    public void updateUser(int userId, UserUpdateRequest userUpdateRequest);
    public boolean deleteUser(int userId);
    public UserDetails getUser(int userId);
    public List<UserDetails> getAllUsers();
}