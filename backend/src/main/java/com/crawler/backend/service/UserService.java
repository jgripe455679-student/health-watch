package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.dto.UserDTO;

public interface UserService {
    public UserDTO createUser(UserDTO userDTO);
    public UserDTO updateUser(Long userId, UserDTO userDTO);
    public String deleteUser(Long userId);
    public UserDTO getUser(Long userId);
    public List<UserDTO> getAllUsers();
}