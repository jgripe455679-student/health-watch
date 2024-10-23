package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.dto.UserDetailsDTO;
import com.crawler.backend.dto.UserUpdateDTO;
import com.crawler.backend.model.User;

public interface UserService {
    public void createUser(User user);
    public void updateUser(int userId, UserUpdateDTO userUpdateDTO);
    public boolean deleteUser(int userId);
    public UserDetailsDTO getUser(int userId);
    public List<UserDetailsDTO> getAllUsers();
}