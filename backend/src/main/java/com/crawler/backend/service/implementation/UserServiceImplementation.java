package com.crawler.backend.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.UserDetailsDTO;
import com.crawler.backend.dto.UserUpdateDTO;
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

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public void createUser(User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            throw new UsernameAlreadyExistException("Username already exist");
        }
        user.setUserPassword(encoder.encode(user.getUserPassword()));
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
    public List<UserDetailsDTO> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<UserDetailsDTO> userListDetails = new ArrayList<>();
        if (userList == null || userList.isEmpty()) {
            throw new NoUsersFoundException("No users found");
        }
        for (int i = 0; i < userList.size(); i++) {
            UserDetailsDTO userDetails = new UserDetailsDTO(userList.get(i).getUserId(), userList.get(i).getUsername(),
                    userList.get(i).getRole(),
                    userList.get(i).getUserDateCreated(), userList.get(i).getUserIsActive());
            userListDetails.add(userDetails);
        }
        return userListDetails;
    }

    @Override
    public UserDetailsDTO getUser(int userId) {
        User user = userRepository.findById(userId).orElse(null);
        UserDetailsDTO userDetails = new UserDetailsDTO();
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }
        userDetails = new UserDetailsDTO(user.getUserId(), user.getUsername(), user.getRole(),
                user.getUserDateCreated(),
                user.getUserIsActive());
        return userDetails;
    }

    @Override
    public void updateUser(int userId, UserUpdateDTO userUpdateDTO) {
        User existingUser = userRepository.findById(userId).orElse(null);
        if (existingUser == null) {
            throw new UserNotFoundException("User not found");
        }
        if (userRepository.findByUsername(userUpdateDTO.getUsername()) != null) {
            throw new UsernameAlreadyExistException("Username already exist");
        }
        if (userUpdateDTO.getPassword() != null || userUpdateDTO.getRetypePassword() != null) {
            existingUser.setUserPassword(encoder.encode(userUpdateDTO.getPassword()));
        }
        existingUser.setUsername(userUpdateDTO.getUsername());
        existingUser.setUserIsActive(userUpdateDTO.getIsActive());
        userRepository.save(existingUser);
    }

}