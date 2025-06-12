package com.crawler.backend.service;

import java.util.List;
import java.util.Map;

import com.crawler.backend.model.MedicalProblemOccurrence;
import com.crawler.backend.model.MedicalProblemOccurrenceAnalytics;

public interface MedicalProblemOccurrenceService {
    List<MedicalProblemOccurrence> getAllMedicalProblemOccurrence();
    List<MedicalProblemOccurrence> getFilteredMedicalProblemOccurrence(List<MedicalProblemOccurrence> records, String healthCondition);
    List<MedicalProblemOccurrenceAnalytics> getMedicalProblemOccurrenceAnalytics();
    String getMedicalProblemOccurrenceDescription();
    Map<String, Object> getDescriptiveAnalytics();
}
