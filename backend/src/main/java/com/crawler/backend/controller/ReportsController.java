package com.crawler.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.model.HealthConditionOccurrence;
import com.crawler.backend.model.MedicalProblemOccurrence;
import com.crawler.backend.model.RecordCount;
import com.crawler.backend.model.ServiceUsage;
import com.crawler.backend.service.DemographicsAnalysisService;
import com.crawler.backend.service.HealthConditionOccurrenceService;
import com.crawler.backend.service.MedicalProblemOccurrenceService;
import com.crawler.backend.service.RecordCountService;
import com.crawler.backend.service.ServiceUsageService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1/reports")
@RestController
@RequiredArgsConstructor
public class ReportsController {

    private final RecordCountService recordCountService;
    private final ServiceUsageService serviceUsageService;
    private final HealthConditionOccurrenceService healthConditionOccurrenceService;
    private final MedicalProblemOccurrenceService medicalProblemOccurrenceService;
    private final DemographicsAnalysisService demographicsAnalysisService;

    @GetMapping("/record-count")
    public ResponseEntity<List<RecordCount>> getAllPatientVisit() {
        return ResponseEntity.ok(recordCountService.getAllRecordCount());
    }

    @GetMapping("/record-count/filter")
    public ResponseEntity<List<RecordCount>> getAllPatientVisitByDateRange(@RequestParam String startDate,
            @RequestParam String endDate) {
        List<RecordCount> records = recordCountService.getAllRecordCount();
        return ResponseEntity.ok(recordCountService.getAllRecordCountByDateRange(records, startDate, endDate));
    }

    @GetMapping("/record-count/analytics")
    public ResponseEntity<Map<String, Object>> getRecordCountDescriptiveAnalytics() {
        return ResponseEntity.ok(recordCountService.getDescriptiveAnalytics());
    }

    @GetMapping("/service-usage")
    public ResponseEntity<List<ServiceUsage>> getAllServiceUsage() {
        List<ServiceUsage> serviceUsages = serviceUsageService.getAllServiceUsage();
        return ResponseEntity.ok(serviceUsages);
    }

    @GetMapping("/service-usage/filter")
    public ResponseEntity<List<ServiceUsage>> getAllServiceUsageByDateRange(@RequestParam String startDate,
            @RequestParam String endDate) {
        List<ServiceUsage> serviceUsages = serviceUsageService.getAllServiceUsage();
        List<ServiceUsage> filteredServiceUsages = serviceUsageService.getAllServiceUsageByDateRange(serviceUsages,
                startDate, endDate);
        return ResponseEntity.ok(filteredServiceUsages);
    }

    @GetMapping("/service-usage/analytics")
    public ResponseEntity<Map<String, Object>> getServiceUsageDescriptiveAnalytics() {
        return ResponseEntity.ok(serviceUsageService.getDescriptiveAnalytics());
    }

    @GetMapping("/health-condition-occurrence")
    public ResponseEntity<List<HealthConditionOccurrence>> getAllHealthConditionOccurrence() {
        return ResponseEntity.ok(healthConditionOccurrenceService.getAllHealthConditionOccurrence());
    }

    @GetMapping("/health-condition-occurrence/analytics")
    public ResponseEntity<Map<String, Object>> getHealthConditionOccurrenceDescriptiveAnalytics() {
        return ResponseEntity.ok(healthConditionOccurrenceService.getDescriptiveAnalytics());
    }

    @GetMapping("/demographics-analysis")
    public ResponseEntity<List<DemographicsAnalysis>> getDemographicsAnalysis() {
        return ResponseEntity.ok(demographicsAnalysisService.getAllDemographicsAnalysis());
    }

    @GetMapping("/demographics-analysis/analytics")
    public ResponseEntity<Map<String, Object>> getDemographicsAnalysisDescriptiveAnalytics() {
        return ResponseEntity.ok(demographicsAnalysisService.getDescriptiveAnalytics());
    }
    

    @GetMapping("/medical-problem-occurrence")
    public ResponseEntity<List<MedicalProblemOccurrence>> getAllMedicalProblemOccurrence() {
        return ResponseEntity.ok(medicalProblemOccurrenceService.getAllMedicalProblemOccurrence());
    }

    @GetMapping("/medical-problem-occurrence/filter")
    public ResponseEntity<List<MedicalProblemOccurrence>> getFilteredMedicalProblemOccurrence(
            @RequestParam String healthCondition) {
        List<MedicalProblemOccurrence> occurrences = medicalProblemOccurrenceService.getAllMedicalProblemOccurrence();
        List<MedicalProblemOccurrence> filteredOccurrences = medicalProblemOccurrenceService
                .getFilteredMedicalProblemOccurrence(occurrences, healthCondition);
        return ResponseEntity.ok(filteredOccurrences);
    }

    @GetMapping("/medical-problem-occurrence/analytics")
    public ResponseEntity<Map<String, Object>> getMedicalProblemOccurrenceDescriptiveAnalytics() {
        return ResponseEntity.ok(medicalProblemOccurrenceService.getDescriptiveAnalytics());
    }

}
