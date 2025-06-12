package com.crawler.backend.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record RecordRequestDto(Long id, LocalDate recordDate, Long profileId, String service,
                Integer height, Integer weight,
                String bloodPressure, Integer pulseRate, String healthCondition, String medicalProblem,
                String diagnosis,
                String medication, String notes,
                LocalDateTime createdAt, String createdBy, LocalDateTime updatedAt, String updatedBy)
                implements Serializable {

}
