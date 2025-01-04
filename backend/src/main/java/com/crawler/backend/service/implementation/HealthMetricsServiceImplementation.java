package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.HealthMetrics;
import com.crawler.backend.repository.HealthMetricsRepository;
import com.crawler.backend.service.HealthMetricsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HealthMetricsServiceImplementation implements HealthMetricsService {

    private final JdbcTemplate jdbcTemplate;

    private final HealthMetricsRepository healthMetricsRepository;

    @Override
    public boolean isTableEmpty() {
        return healthMetricsRepository.count() == 0;
    }

    @Override
    public void saveData(List<HealthMetrics> data) {
        healthMetricsRepository.saveAll(data);
    }

    @Override
    public void truncateAndSaveData(List<HealthMetrics> data) {
        jdbcTemplate.execute("TRUNCATE TABLE health_metrics");
        healthMetricsRepository.saveAll(data);
    }

    @Override
    public List<HealthMetrics> getAllHealthMetrics() {
        return healthMetricsRepository.findAll().stream().collect(Collectors.toList());
    }

    @Override
    public void saveNewData(List<HealthMetrics> data) {
        for (HealthMetrics record : data) {
            if (!healthMetricsRepository.existsByRecordDate(record.getRecordDate())) {
                healthMetricsRepository.save(record);
            }
        }
    }

}
