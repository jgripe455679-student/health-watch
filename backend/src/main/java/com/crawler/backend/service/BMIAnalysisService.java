package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.dto.BMIAnalysisDto;
import com.crawler.backend.model.BMIAnalysis;

public interface BMIAnalysisService {

    boolean isTableEmpty();

    void saveData(List<BMIAnalysis> data);

    void truncateAndSaveData(List<BMIAnalysis> data);

    List<BMIAnalysis> getAllBMIAnalysis();

    List<BMIAnalysisDto> getCustomBMIAnalysis();

    List<BMIAnalysisDto> findCustomBMIAnalysisByDateRange(String startDate, String endDate);
}
