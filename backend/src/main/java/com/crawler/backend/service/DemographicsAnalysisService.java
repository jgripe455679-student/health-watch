package com.crawler.backend.service;

import java.util.List;
import java.util.Map;

import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.model.DemographicsAnalysisAnalytics;

public interface DemographicsAnalysisService {
    List<DemographicsAnalysis> getAllDemographicsAnalysis();
    List<DemographicsAnalysisAnalytics> getDemographicsAnalysisAnalytics();
    String getDemographicsAnalysisDescription();
    Map<String, Object> getDescriptiveAnalytics();
}
