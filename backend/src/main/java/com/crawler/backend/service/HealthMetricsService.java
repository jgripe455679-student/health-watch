package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.model.HealthMetrics;

public interface HealthMetricsService {
    
    boolean isTableEmpty();

    void saveData(List<HealthMetrics> data);

    void truncateAndSaveData(List<HealthMetrics> data);

    List<HealthMetrics> getAllHealthMetrics();

    void saveNewData(List<HealthMetrics> data);
}
