package com.crawler.backend.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public record ProfileDto(Long id, String firstName, String middleName, String lastName, String suffix,
                LocalDate dateOfBirth,
                String gender, String maritalStatus, String address, String mobileNumber, String occupation,
                String educationalBackground, Integer householdSize, String incomeBracket, Set<LocalDate> records,
                LocalDateTime createdAt,
                String createdBy, LocalDateTime updatedAt, String updatedBy) implements Serializable {

}
