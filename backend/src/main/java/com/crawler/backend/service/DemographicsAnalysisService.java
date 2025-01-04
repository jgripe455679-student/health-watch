package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.model.DemographicsAnalysis;

public interface DemographicsAnalysisService {
    boolean isTableEmpty();
    
    void saveData(List<DemographicsAnalysis> data);

    void truncateAndSaveData(List<DemographicsAnalysis> data);

    List<DemographicsAnalysis> getDemographicsAnalysis();
}
