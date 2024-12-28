package com.crawler.backend.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public record RecordResponseDto(Long id, LocalDate recordDate, String profileType, Long profileId, String profile,
                String department,
                Set<String> services, Integer height, Integer weight, String bloodPressure,
                LocalDateTime createdAt, String createdBy, LocalDateTime updatedAt, String updatedBy)
                implements Serializable {

}
