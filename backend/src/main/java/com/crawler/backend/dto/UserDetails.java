package com.crawler.backend.dto;

import java.time.LocalDateTime;

public class UserDetails {
    private int userId;
    private String username;
    private LocalDateTime userDateCreated;
    private Boolean userIsActive;

    public UserDetails() {
    }

    public UserDetails(int userId, String username, LocalDateTime userDateCreated, boolean userIsActive) {
        this.userId = userId;
        this.username = username;
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
