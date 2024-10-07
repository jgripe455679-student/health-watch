package com.crawler.backend.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.crawler.backend.dto.UserDetails;
import com.crawler.backend.dto.UserUpdateRequest;
import com.crawler.backend.exception.NoUsersFoundException;
import com.crawler.backend.exception.UserNotFoundException;
import com.crawler.backend.exception.UsernameAlreadyExistException;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.UserRepository;
import com.crawler.backend.service.UserService;

@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void createUser(User user) {
        User existingUser = userRepository.findByUsername(user.getUsername()).orElse(null);
        if (existingUser != null) {
            throw new UsernameAlreadyExistException("Username already exist");
        }
        userRepository.save(user);
    }

    @Override
    public boolean deleteUser(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        userRepository.deleteById(userId);
        return true;
    }

    @Override
    public List<UserDetails> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<UserDetails> userListDetails = new ArrayList<>();
        if (userList == null || userList.isEmpty()) {
            throw new NoUsersFoundException("No users found");
        }
        for (int i = 0; i < userList.size(); i++) {
            UserDetails userDetails = new UserDetails(userList.get(i).getUserId(), userList.get(i).getUsername(),
                    userList.get(i).getUserDateCreated(), userList.get(i).getUserIsActive());
            userListDetails.add(userDetails);
        }
        return userListDetails;
    }

    @Override
    public UserDetails getUser(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        UserDetails userDetails = new UserDetails();
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        userDetails = new UserDetails(user.getUserId(), user.getUsername(), user.getUserDateCreated(),
                user.getUserIsActive());
        return userDetails;
    }

    @Override
    public void updateUser(int userId, UserUpdateRequest userUpdateRequest) {
        User existingUser = userRepository.findById(userId).orElse(null);
        if (existingUser == null) {
            throw new UserNotFoundException("User not found");
        }
        if (userRepository.findByUsername(userUpdateRequest.getUsername()).orElse(null) != null) {
            throw new UsernameAlreadyExistException("Username already exist");
        }
        existingUser.setUsername(userUpdateRequest.getUsername());
        existingUser.setUserPassword(userUpdateRequest.getPassword());
        existingUser.setUserIsActive(userUpdateRequest.getIsActive());
        userRepository.save(existingUser);
    }

}