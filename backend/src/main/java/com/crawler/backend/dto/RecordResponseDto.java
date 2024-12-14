package com.crawler.backend.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public record RecordResponseDto(Long id, LocalDate recordDate, String profileType, String profile, String department,
                Set<String> services,
                LocalDateTime createdAt, String createdBy, LocalDateTime updatedAt, String updatedBy)
                implements Serializable {

}
