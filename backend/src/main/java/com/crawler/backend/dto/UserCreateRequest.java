package com.crawler.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class UserCreateRequest {
    @NotBlank(message = "Username is required")
    private String username;
    
    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Retype password is required")
    private String retypePassword;

    public UserCreateRequest() {

    }

    public UserCreateRequest(String username, String password, String retypePassword) {
        this.username = username;
        this.password = password;
        this.retypePassword = retypePassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRetypePassword() {
        return retypePassword;
    }

    public void setRetypePassword(String retypePassword) {
        this.retypePassword = retypePassword;
    }
}
