package com.crawler.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.dto.BMIAnalysisDto;
import com.crawler.backend.dto.DepartmentUsageDto;
import com.crawler.backend.model.BPTrends;
import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.model.RecordCount;
import com.crawler.backend.service.BMIAnalysisService;
import com.crawler.backend.service.BPTrendsService;
import com.crawler.backend.service.DemographicsAnalysisService;
import com.crawler.backend.service.DepartmentUsageService;
import com.crawler.backend.service.RecordCountService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/reports")
@RestController
@RequiredArgsConstructor
public class ReportsController {

    private final DepartmentUsageService departmentUsageService;
    private final RecordCountService recordCountService;
    private final DemographicsAnalysisService demographicsAnalysisService;
    private final BPTrendsService bpTrendsService;
    private final BMIAnalysisService bmiAnalysisService;

    @GetMapping("/department-usage")
    public ResponseEntity<List<DepartmentUsageDto>> getFilteredDepartmentUsage() {
        return ResponseEntity.ok(departmentUsageService.getFilteredDepartmentUsage());
    }

    @GetMapping("/department-usage/filter")
    public ResponseEntity<List<DepartmentUsageDto>> getFilteredDepartmentUsageByDateRange(
            @RequestParam String startDate, @RequestParam String endDate) {
        if (startDate == null || startDate.trim().isEmpty() ||
                endDate == null || endDate.trim().isEmpty()) {
            throw new IllegalArgumentException("startDate and endDate must not be empty.");
        }
        return ResponseEntity.ok(departmentUsageService.findDepartmentRecordCountsByDateRange(startDate, endDate));
    }

    @GetMapping("/record-count")
    public ResponseEntity<List<RecordCount>> getAllPatientVisit() {
        return ResponseEntity.ok(recordCountService.getAllRecordCount());
    }

    @GetMapping("/record-count/filter")
    public ResponseEntity<List<RecordCount>> getPatientVisitByRecordDateBetween(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        if (startDate == null || startDate.trim().isEmpty() ||
                endDate == null || endDate.trim().isEmpty()) {
            throw new IllegalArgumentException("startDate and endDate must not be empty.");
        }
        return ResponseEntity.ok(recordCountService.findByRecordDateBetween(startDate, endDate));
    }

    @GetMapping("/demographics-analysis")
    public ResponseEntity<List<DemographicsAnalysis>> getDemographicsAnalysis() {
        return ResponseEntity.ok(demographicsAnalysisService.getDemographicsAnalysis());
    }

    @GetMapping("/bp-trends")
    public ResponseEntity<List<BPTrends>> getAllBPTrends() {
        return ResponseEntity.ok(bpTrendsService.getAllBPTrends());
    }

    @GetMapping("/bp-trends/filter")
    public ResponseEntity<List<BPTrends>> getBPTrendsByRecordDateBetween(@RequestParam String startDate,
            @RequestParam String endDate) {
        if (startDate == null || startDate.trim().isEmpty() ||
                endDate == null || endDate.trim().isEmpty()) {
            throw new IllegalArgumentException("startDate and endDate must not be empty.");
        }
        return ResponseEntity.ok(bpTrendsService.findByRecordDateBetween(startDate, endDate));
    }

    @GetMapping("/bmi-analysis")
    public ResponseEntity<List<BMIAnalysisDto>> getAllBMIAnalysis() {
        return ResponseEntity.ok(bmiAnalysisService.getCustomBMIAnalysis());
    }

    @GetMapping("/bmi-analysis/filter")
    public ResponseEntity<List<BMIAnalysisDto>> getCustomBMIAnalysisByDateRange(@RequestParam String startDate,
            @RequestParam String endDate) {
        if (startDate == null || startDate.trim().isEmpty() ||
                endDate == null || endDate.trim().isEmpty()) {
            throw new IllegalArgumentException("startDate and endDate must not be empty.");
        }
        return ResponseEntity.ok(bmiAnalysisService.findCustomBMIAnalysisByDateRange(startDate, endDate));
    }

}
