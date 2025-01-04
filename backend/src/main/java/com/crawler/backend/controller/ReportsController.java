package com.crawler.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.model.DepartmentUsage;
import com.crawler.backend.model.HealthMetrics;
import com.crawler.backend.model.RecordCount;
import com.crawler.backend.service.DemographicsAnalysisService;
import com.crawler.backend.service.DepartmentUsageService;
import com.crawler.backend.service.HealthMetricsService;
import com.crawler.backend.service.RecordCountService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/reports")
@RestController
@RequiredArgsConstructor
public class ReportsController {

    private final DepartmentUsageService departmentUsageService;
    private final HealthMetricsService healthMetricsService;
    private final RecordCountService recordCountService;
    private final DemographicsAnalysisService demographicsAnalysisService;

    @GetMapping("/department-usage")
    public ResponseEntity<List<DepartmentUsage>> getAllDepartmentUsage() {
        return ResponseEntity.ok(departmentUsageService.getAllDepartmentUsage());
    }

    @GetMapping("/health-metrics")
    public ResponseEntity<List<HealthMetrics>> getAllHealthMetrics() {
        return ResponseEntity.ok(healthMetricsService.getAllHealthMetrics());
    }

    @GetMapping("/record-count")
    public ResponseEntity<List<RecordCount>> getAllPatientVisit() {
        return ResponseEntity.ok(recordCountService.getAllRecordCount());
    }

    @GetMapping("/demographics-analysis")
    public ResponseEntity<List<DemographicsAnalysis>> getDemographicsAnalysis() {
        return ResponseEntity.ok(demographicsAnalysisService.getDemographicsAnalysis());
    }

}
