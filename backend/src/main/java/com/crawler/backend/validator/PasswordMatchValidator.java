package com.crawler.backend.validator;

import java.lang.reflect.Field;

import com.crawler.backend.annotation.PasswordMatch;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, Object> {
    private String passwordFieldName;
    private String confirmPasswordFieldName;

    @Override
    public void initialize(PasswordMatch constraintAnnotation) {
        passwordFieldName = constraintAnnotation.password();
        confirmPasswordFieldName = constraintAnnotation.confirmPassword();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {

        try {
            Field passwordField = value.getClass().getDeclaredField(passwordFieldName);
            Field confirmPasswordField = value.getClass().getDeclaredField(confirmPasswordFieldName);
            passwordField.setAccessible(true);
            confirmPasswordField.setAccessible(true);
            String passwordValue = (String) passwordField.get(value);
            String confirmPasswordValue = (String) confirmPasswordField.get(value);
            return passwordValue != null && passwordValue.equals(confirmPasswordValue);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            return false;
        }
    }
}