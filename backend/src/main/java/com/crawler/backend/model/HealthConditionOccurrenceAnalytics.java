package com.crawler.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthConditionOccurrenceAnalytics {

    private String healthCondition;

    private Double percentage;

    private Double rateOfChange;
}