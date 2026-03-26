package com.crawler.backend.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public record ProfileDto(Long id, String firstName, String middleName, String lastName, String suffix,
                LocalDate dateOfBirth, Short age,
                String gender, String maritalStatus, String address, String emailAddress, String mobileNumber,
                String occupation, String educationalBackground, Set<LocalDate> records,
                LocalDateTime createdAt,
                String createdBy, LocalDateTime updatedAt, String updatedBy, boolean isArchived)
                implements Serializable {

}
