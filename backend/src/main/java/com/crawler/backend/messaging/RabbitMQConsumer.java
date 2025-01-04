package com.crawler.backend.messaging;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.model.DepartmentUsage;
import com.crawler.backend.model.HealthMetrics;
import com.crawler.backend.model.RecordCount;
import com.crawler.backend.service.DemographicsAnalysisService;
import com.crawler.backend.service.DepartmentUsageService;
import com.crawler.backend.service.HealthMetricsService;
import com.crawler.backend.service.RecordCountService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class RabbitMQConsumer {

    private final DepartmentUsageService departmentUsageService;
    private final ObjectMapper objectMapper;
    private final HealthMetricsService healthMetricsService;
    private final RecordCountService recordCountService;
    private final DemographicsAnalysisService demographicsAnalysisService;

    public RabbitMQConsumer(DepartmentUsageService departmentUsageService, ObjectMapper objectMapper,
            HealthMetricsService healthMetricsService, RecordCountService recordCountService,
            DemographicsAnalysisService demographicsAnalysisService) {
        this.departmentUsageService = departmentUsageService;
        this.objectMapper = objectMapper;
        this.healthMetricsService = healthMetricsService;
        this.recordCountService = recordCountService;
        this.demographicsAnalysisService = demographicsAnalysisService;
    }

    @RabbitListener(queues = "count_patient_visit_result_queue")
    public void receiveRecordCountResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode recordDateNode = rootNode.get("recordDate");
            JsonNode recordCountNode = rootNode.get("recordCount");

            List<RecordCount> records = new ArrayList<>();

            Iterator<String> fieldNames = recordDateNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                long recordDateMillis = recordDateNode.path(fieldName).asLong();
                int recordCount = recordCountNode.path(fieldName).asInt();

                LocalDate recordDate = Instant.ofEpochMilli(recordDateMillis)
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate();

                RecordCount record = new RecordCount();
                record.setRecordDate(recordDate);
                record.setRecordCount(recordCount);

                records.add(record);
            }
            if (recordCountService.isTableEmpty()) {
                recordCountService.saveData(records);
            } else {
                recordCountService.truncateAndSaveData(records);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "aggregate_health_metrics_result_queue")
    public void receiveAggregateHealthMetricsResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode recordDateNode = rootNode.get("recordDate");
            JsonNode heightMeanNode = rootNode.get("height_mean");
            JsonNode heightMedianNode = rootNode.get("height_median");
            JsonNode heightStdNode = rootNode.get("height_std");
            JsonNode weightMeanNode = rootNode.get("weight_mean");
            JsonNode weightMedianNode = rootNode.get("weight_median");
            JsonNode weightStdNode = rootNode.get("weight_std");
            JsonNode systolicMeanNode = rootNode.get("systolic_mean");
            JsonNode systolicMedianNode = rootNode.get("systolic_median");
            JsonNode systolicStdNode = rootNode.get("systolic_std");
            JsonNode diastolicMeanNode = rootNode.get("diastolic_mean");
            JsonNode diastolicMedianNode = rootNode.get("diastolic_median");
            JsonNode diastolicStdNode = rootNode.get("diastolic_std");

            List<HealthMetrics> records = new ArrayList<>();

            Iterator<String> fieldNames = recordDateNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                long recordDateMillis = recordDateNode.path(fieldName).asLong();
                double heightMean = heightMeanNode.path(fieldName).asDouble();
                double heightMedian = heightMedianNode.path(fieldName).asDouble();
                double heightStd = heightStdNode.path(fieldName).asDouble();
                double weightMean = weightMeanNode.path(fieldName).asDouble();
                double weightMedian = weightMedianNode.path(fieldName).asDouble();
                double weightStd = weightStdNode.path(fieldName).asDouble();
                double systolicMean = systolicMeanNode.path(fieldName).asDouble();
                double systolicMedian = systolicMedianNode.path(fieldName).asDouble();
                double systolicStd = systolicStdNode.path(fieldName).asDouble();
                double diastolicMean = diastolicMeanNode.path(fieldName).asDouble();
                double diastolicMedian = diastolicMedianNode.path(fieldName).asDouble();
                double diastolicStd = diastolicStdNode.path(fieldName).asDouble();

                LocalDate recordDate = Instant.ofEpochMilli(recordDateMillis)
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate();

                HealthMetrics record = new HealthMetrics();
                record.setRecordDate(recordDate);
                record.setHeightMean(heightMean);
                record.setHeightMedian(heightMedian);
                record.setHeightStd(heightStd);
                record.setWeightMean(weightMean);
                record.setWeightMedian(weightMedian);
                record.setWeightStd(weightStd);
                record.setSystolicMean(systolicMean);
                record.setSystolicMedian(systolicMedian);
                record.setSystolicStd(systolicStd);
                record.setDiastolicMean(diastolicMean);
                record.setDiastolicMedian(diastolicMedian);
                record.setDiastolicStd(diastolicStd);

                records.add(record);
            }
            if (healthMetricsService.isTableEmpty()) {
                healthMetricsService.saveData(records);
            } else {
                healthMetricsService.truncateAndSaveData(records);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "calculate_department_usage_result_queue")
    public void receiveCalculateDepartmentUsageResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode departmentNode = rootNode.get("department");
            JsonNode recordDateNode = rootNode.get("recordDate");
            JsonNode recordCountNode = rootNode.get("recordCount");

            List<DepartmentUsage> records = new ArrayList<>();

            Iterator<String> fieldNames = departmentNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                String department = departmentNode.path(fieldName).asText();
                long recordDateMillis = recordDateNode.path(fieldName).asLong();
                int recordCount = recordCountNode.path(fieldName).asInt();

                LocalDate recordDate = Instant.ofEpochMilli(recordDateMillis)
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate();

                DepartmentUsage record = new DepartmentUsage();
                record.setDepartment(department);
                record.setRecordDate(recordDate);
                record.setRecordCount(recordCount);

                records.add(record);
            }
            if (departmentUsageService.isTableEmpty()) {
                departmentUsageService.saveData(records);
            } else {
                departmentUsageService.truncateAndSaveData(records);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "profile_demographics_analysis_result_queue")
    public void receiveDemographicsAnalysisResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode socioeconomicClassNode = rootNode.get("socioeconomic_class");
            JsonNode profileCountNode = rootNode.get("profileCount");

            List<DemographicsAnalysis> profiles = new ArrayList<>();

            Iterator<String> fieldNames = socioeconomicClassNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                String socioeconomicClass = socioeconomicClassNode.path(fieldName).asText();
                int profileCount = profileCountNode.path(fieldName).asInt();

                DemographicsAnalysis profile = new DemographicsAnalysis();
                profile.setSocioeconomicClass(socioeconomicClass);
                profile.setProfileCount(profileCount);

                profiles.add(profile);
            }
            if (demographicsAnalysisService.isTableEmpty()) {
                demographicsAnalysisService.saveData(profiles);
            } else {
                demographicsAnalysisService.truncateAndSaveData(profiles);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // try {
        // String jsonString = objectMapper.readValue(message, String.class);
        // JsonNode rootNode = objectMapper.readTree(jsonString);
        // JsonNode departmentNode = rootNode.get("department");
        // JsonNode recordDateNode = rootNode.get("recordDate");
        // JsonNode recordCountNode = rootNode.get("recordCount");

        // List<DepartmentRecordCount> records = new ArrayList<>();

        // Iterator<String> fieldNames = departmentNode.fieldNames();
        // while (fieldNames.hasNext()) {
        // String fieldName = fieldNames.next();
        // String department = departmentNode.path(fieldName).asText();
        // long recordDateMillis = recordDateNode.path(fieldName).asLong();
        // int recordCount = recordCountNode.path(fieldName).asInt();

        // LocalDate recordDate = Instant.ofEpochMilli(recordDateMillis)
        // .atZone(ZoneId.systemDefault())
        // .toLocalDate();

        // DepartmentRecordCount record = new DepartmentRecordCount();
        // record.setDepartment(department);
        // record.setRecordDate(recordDate);
        // record.setRecordCount(recordCount);

        // records.add(record);
        // }
        // if (departmentRecordCountService.isTableEmpty()) {
        // departmentRecordCountService.saveData(records);
        // } else {
        // departmentRecordCountService.saveNewData(records);
        // }
        // } catch (Exception e) {
        // e.printStackTrace();
        // }
    }

}
