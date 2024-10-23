package com.crawler.backend.dto;

import com.crawler.backend.model.Role;

import jakarta.validation.constraints.NotBlank;

public class UserCreateDTO {
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Retype password is required")
    private String retypePassword;

    private Role role;

    public UserCreateDTO() {

    }

    public UserCreateDTO(String username, String password, String retypePassword, Role role) {
        this.username = username;
        this.password = password;
        this.retypePassword = retypePassword;
        this.role = role;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
