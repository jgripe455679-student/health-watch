package com.crawler.backend.dto;

import java.time.LocalDateTime;

import com.crawler.backend.model.Role;

public class UserDetailsDTO {
    private int userId;
    private String username;
    private Role role;
    private LocalDateTime userDateCreated;
    private Boolean userIsActive;

    public UserDetailsDTO() {
    }

    public UserDetailsDTO(int userId, String username, Role role, LocalDateTime userDateCreated, boolean userIsActive) {
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.userDateCreated = userDateCreated;
        this.userIsActive = userIsActive;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getUserDateCreated() {
        return userDateCreated;
    }

    public void setUserDateCreated(LocalDateTime userDateCreated) {
        this.userDateCreated = userDateCreated;
    }

    public boolean getUserIsActive() {
        return userIsActive;
    }

    public void setUserIsActive(boolean userIsActive) {
        this.userIsActive = userIsActive;
    }

}
