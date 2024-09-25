package com.crawler.backend.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.User;
import com.crawler.backend.repository.UserRepository;
import com.crawler.backend.service.UserService;
import com.crawler.exception.UsernameAlreadyExistException;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    UserRepository userRepository;

    public UserServiceImplementation() {

    }

    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String createUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new UsernameAlreadyExistException("Username already exist.");
        }
        userRepository.save(user);
        return "User created successfully.";
    }

    @Override
    public String deleteUser(int userId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public User getUser(int userId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String updateUser(User user) {
        // TODO Auto-generated method stub
        return null;
    }
    
}