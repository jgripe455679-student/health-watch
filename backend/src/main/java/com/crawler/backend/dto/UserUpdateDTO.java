package com.crawler.backend.dto;

public class UserUpdateDTO {
    private String username;
    private String password;
    private String retypePassword;
    private Boolean isActive;

    public UserUpdateDTO() {
    }

    public UserUpdateDTO(String username, String password, String retypePassword, boolean isActive) {
        this.username = username;
        this.password = password;
        this.retypePassword = retypePassword;
        this.isActive = isActive;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setRetypePassword(String retypePassword) {
        this.retypePassword = retypePassword;
    }

    public String getRetypePassword() {
        return retypePassword;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public boolean getIsActive() {
        return isActive;
    }
}
