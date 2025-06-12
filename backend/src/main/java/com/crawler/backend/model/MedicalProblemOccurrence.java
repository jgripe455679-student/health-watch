package com.crawler.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalProblemOccurrence {
    
    private String recordDate;

    private String healthCondition;

    private String medicalProblem;

    private Long recordCount;
}
