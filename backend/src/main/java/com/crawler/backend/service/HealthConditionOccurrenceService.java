package com.crawler.backend.service;

import java.util.List;
import java.util.Map;

import com.crawler.backend.model.HealthConditionOccurrence;
import com.crawler.backend.model.HealthConditionOccurrenceAnalytics;

public interface HealthConditionOccurrenceService {
    List<HealthConditionOccurrence> getAllHealthConditionOccurrence();
    List<HealthConditionOccurrence> getAllHealthConditionOccurrenceByDateRange(String startDate, String endDate);
    List<HealthConditionOccurrenceAnalytics> getHealthConditionOccurrenceAnalytics();
    String getHealthConditionOccurrenceDescription();
    Map<String, Object> getDescriptiveAnalytics();
}
