package com.crawler.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import com.crawler.backend.annotation.PasswordMatch;
import com.crawler.backend.annotation.ValidRole;

@Getter
@Setter
@PasswordMatch(password = "password", confirmPassword = "confirmPassword", message = "Passwords do not match")
public class UserRequestDto {
        @NotNull
        @Size(min = 4, message = "Username must be at least 4 characters long")
        @Pattern(regexp = "^[a-z]+$", message = "Username must contain only lowercase letters")
        private String username;

        @NotNull
        @Size(min = 8, max = 64, message = "Password must be between 8 and 64 characters long")
        @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).+$", message = "Password must contain at least one uppercase letter, one number, and one symbol")
        private String password;

        @NotNull
        @Size(min = 8, max = 64, message = "Password must be between 8 and 64 characters long")
        @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).+$", message = "Password must contain at least one uppercase letter, one number, and one symbol")
        private String confirmPassword;

        @NotNull
        @ValidRole
        private String role;

        @NotNull
        @Size(min = 4, message = "Username must be at least 4 characters long")
        @Pattern(regexp = "^[a-z]+$", message = "Username must contain only lowercase letters")
        private String createdBy;

        @NotNull
        @Size(min = 4, message = "Username must be at least 4 characters long")
        @Pattern(regexp = "^[a-z]+$", message = "Username must contain only lowercase letters")
        private String updatedBy;
}