package com.crawler.backend.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.HealthMetrics;

@Repository
public interface HealthMetricsRepository extends JpaRepository<HealthMetrics, Long> {
    boolean existsByRecordDate(LocalDate recordDate);
}
