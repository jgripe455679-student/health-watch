package com.crawler.backend.service;

import java.util.List;
import java.util.Map;

import com.crawler.backend.model.MedicalProblemOccurrence;
import com.crawler.backend.model.MedicalProblemOccurrenceAnalytics;

public interface MedicalProblemOccurrenceService {
    List<MedicalProblemOccurrence> getAllMedicalProblemOccurrence();

    List<MedicalProblemOccurrence> getFilteredMedicalProblemOccurrence(String healthCondition);

    List<MedicalProblemOccurrence> getFilteredMedicalProblemOccurrenceByDateRange(String healthCondition,
            String startDate, String endDate);

    List<MedicalProblemOccurrenceAnalytics> getMedicalProblemOccurrenceAnalytics();

    String getMedicalProblemOccurrenceDescription();

    Map<String, Object> getDescriptiveAnalytics();
}
