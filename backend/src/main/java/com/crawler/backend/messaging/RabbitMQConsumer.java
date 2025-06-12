package com.crawler.backend.messaging;

import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.model.DemographicsAnalysisAnalytics;
import com.crawler.backend.model.HealthConditionOccurrence;
import com.crawler.backend.model.HealthConditionOccurrenceAnalytics;
import com.crawler.backend.model.MedicalProblemOccurrence;
import com.crawler.backend.model.MedicalProblemOccurrenceAnalytics;
import com.crawler.backend.model.RecordCount;
import com.crawler.backend.model.RecordCountAnalytics;
import com.crawler.backend.model.ServiceUsage;
import com.crawler.backend.model.ServiceUsageAnalytics;
import com.crawler.backend.service.RecordCountService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class RabbitMQConsumer {

    private static final Logger logger = LoggerFactory.getLogger(RabbitMQConsumer.class);

    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    private final StringRedisTemplate stringRedisTemplate;

    public RabbitMQConsumer(ObjectMapper objectMapper,
            RecordCountService recordCountService, RedisTemplate<String, Object> redisTemplate,
            StringRedisTemplate stringRedisTemplate) {
        this.objectMapper = objectMapper;
        this.redisTemplate = redisTemplate;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @RabbitListener(queues = "count_patient_visit_result_queue")
    public void receiveRecordCountResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode recordDateNode = rootNode.get("recordDate");
            JsonNode recordCountNode = rootNode.get("recordCount");

            String hashKey = "record_count";
            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<RecordCount> records = new ArrayList<>();

            Iterator<String> fieldNames = recordDateNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                long recordDateMillis = recordDateNode.path(fieldName).asLong();
                long recordCount = recordCountNode.path(fieldName).asLong();

                String recordDateStr = Instant.ofEpochMilli(recordDateMillis)
                        .atZone(ZoneId.of("UTC"))
                        .toLocalDate()
                        .toString();

                RecordCount record = new RecordCount();
                record.setRecordDate(recordDateStr);
                record.setRecordCount(recordCount);

                records.add(record);
            }

            valOps.set(hashKey, records);
        } catch (Exception e) {
            logger.error("Failed to process incoming message from count_patient_visit_result_queue:", e);
        }
    }

    @RabbitListener(queues = "calculate_service_usage_result_queue")
    public void receiveServiceUsageResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode recordDateNode = rootNode.get("recordDate");
            JsonNode serviceNode = rootNode.get("service");
            JsonNode usageNode = rootNode.get("recordCount");

            String hashKey = "service_usage";
            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<ServiceUsage> usages = new ArrayList<>();

            Iterator<String> fieldNames = recordDateNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                long recordDateMillis = recordDateNode.path(fieldName).asLong();
                String service = serviceNode.path(fieldName).asText();
                long recordCount = usageNode.path(fieldName).asLong();

                String recordDateStr = Instant.ofEpochMilli(recordDateMillis)
                        .atZone(ZoneId.of("UTC"))
                        .toLocalDate()
                        .toString();

                ServiceUsage usage = new ServiceUsage();
                usage.setRecordDate(recordDateStr);
                usage.setService(service);
                usage.setRecordCount(recordCount);

                usages.add(usage);
            }

            valOps.set(hashKey, usages);
        } catch (Exception e) {
            logger.error("Failed to process incoming message from calculate_service_usage_result_queue:", e);
        }
    }

    @RabbitListener(queues = "aggregate_health_condition_occurrence_result_queue")
    public void receiveHealthConditionOccurrenceResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode recordDateNode = rootNode.get("recordDate");
            JsonNode healthConditionNode = rootNode.get("healthCondition");
            JsonNode recordCountNode = rootNode.get("recordCount");

            String hashKey = "health_condition_occurrence";
            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<HealthConditionOccurrence> occurrences = new ArrayList<>();

            Iterator<String> fieldNames = recordDateNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                long recordDateMillis = recordDateNode.path(fieldName).asLong();
                String healthCondition = healthConditionNode.path(fieldName).asText();
                long recordCount = recordCountNode.path(fieldName).asLong();

                String recordDateStr = Instant.ofEpochMilli(recordDateMillis)
                        .atZone(ZoneId.of("UTC"))
                        .toLocalDate()
                        .toString();

                HealthConditionOccurrence occurrence = new HealthConditionOccurrence();
                occurrence.setRecordDate(recordDateStr);
                occurrence.setHealthCondition(healthCondition);
                occurrence.setRecordCount(recordCount);

                occurrences.add(occurrence);
            }

            valOps.set(hashKey, occurrences);
        } catch (Exception e) {
            logger.error("Failed to process incoming message from aggregate_health_condition_occurrence_result_queue:",
                    e);
        }
    }

    @RabbitListener(queues = "tally_medical_problem_occurrence_result_queue")
    public void receiveMedicalProblemOccurrenceResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode recordDateNode = rootNode.get("recordDate");
            JsonNode healthConditionNode = rootNode.get("healthCondition");
            JsonNode medicalProblemNode = rootNode.get("medicalProblem");
            JsonNode recordCountNode = rootNode.get("recordCount");

            String hashKey = "medical_problem_occurrence";
            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> redisValOps = redisTemplate.opsForValue();

            List<MedicalProblemOccurrence> occurrences = new ArrayList<>();

            Iterator<String> fieldNames = recordDateNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                long recordDateMillis = recordDateNode.path(fieldName).asLong();
                String healthCondition = healthConditionNode.path(fieldName).asText();
                String medicalProblem = medicalProblemNode.path(fieldName).asText();
                long recordCount = recordCountNode.path(fieldName).asLong();

                String recordDateStr = Instant.ofEpochMilli(recordDateMillis)
                        .atZone(ZoneId.of("UTC"))
                        .toLocalDate()
                        .toString();

                MedicalProblemOccurrence occurrence = new MedicalProblemOccurrence();
                occurrence.setRecordDate(recordDateStr);
                occurrence.setHealthCondition(healthCondition);
                occurrence.setMedicalProblem(medicalProblem);
                occurrence.setRecordCount(recordCount);

                occurrences.add(occurrence);
            }

            redisValOps.set(hashKey, occurrences);
        } catch (Exception e) {
            logger.error("Failed to process incoming message from tally_medical_problem_occurrence_result_queue:", e);
        }
    }

    @RabbitListener(queues = "profile_demographics_analysis_result_queue")
    public void receiveDemographicsAnalysisResult(String message) {
        try {
            String jsonString = objectMapper.readValue(message, String.class);
            JsonNode rootNode = objectMapper.readTree(jsonString);
            JsonNode ageGroupNode = rootNode.get("ageGroup");
            JsonNode percentageNode = rootNode.get("percentage");

            String hashKey = "demographics_analysis";
            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<DemographicsAnalysis> profiles = new ArrayList<>();

            Iterator<String> fieldNames = ageGroupNode.fieldNames();
            while (fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                String ageGroup = ageGroupNode.path(fieldName).asText();
                double percentage = percentageNode.path(fieldName).asDouble();

                DemographicsAnalysis profile = new DemographicsAnalysis();
                profile.setAgeGroup(ageGroup);
                profile.setPercentage(percentage);

                profiles.add(profile);
            }

            valOps.set(hashKey, profiles);
        } catch (Exception e) {
            logger.error("Failed to process incoming message from profile_demographics_analysis_result_queue:", e);
        }
    }

    @RabbitListener(queues = "record_count_descriptive_analytics_result_queue")
    public void receiveRecordCountDescriptiveAnalyticsResult(String message) {
        try {
            JsonNode rootNode = objectMapper.readTree(message);
            JsonNode analyticsNode = rootNode.get("analytics");
            String description = rootNode.get("description").asText();

            String hashKey = "record_count_descriptive_analytics";
            ValueOperations<String, String> strValOps = stringRedisTemplate.opsForValue();

            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<RecordCountAnalytics> records = new ArrayList<>();

            if (analyticsNode != null && analyticsNode.isArray()) {
                analyticsNode.forEach(node -> {
                    String recordDateStr = node.get("recordDate").asText();
                    double rateOfChange = node.get("rateOfChange").asDouble();

                    RecordCountAnalytics record = new RecordCountAnalytics();
                    record.setRecordDate(recordDateStr);
                    record.setRateOfChange(rateOfChange);

                    records.add(record);
                });
            }
            valOps.set(hashKey, records);
            strValOps.set(hashKey + ":description", description);
        } catch (Exception e) {
            logger.error("Failed to process incoming message from record_count_descriptive_analytics_result_queue:", e);
        }
    }

    @RabbitListener(queues = "service_usage_descriptive_analytics_result_queue")
    public void receiveServiceUsageDescriptiveAnalyticsResult(String message) {
        try {
            JsonNode rootNode = objectMapper.readTree(message);
            JsonNode analyticsNode = rootNode.get("analytics");
            String description = rootNode.get("description").asText();

            String hashKey = "service_usage_descriptive_analytics";
            ValueOperations<String, String> strValOps = stringRedisTemplate.opsForValue();

            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<ServiceUsageAnalytics> usages = new ArrayList<>();

            if (analyticsNode != null && analyticsNode.isArray()) {
                analyticsNode.forEach(node -> {
                    String service = node.get("service").asText();
                    long recordCount = node.get("recordCount").asLong();
                    double percentage = node.get("percentage").asDouble();

                    ServiceUsageAnalytics usage = new ServiceUsageAnalytics();
                    usage.setService(service);
                    usage.setRecordCount(recordCount);
                    usage.setPercentage(percentage);

                    usages.add(usage);
                });
            }

            valOps.set(hashKey, usages);
            strValOps.set(hashKey + ":description", description);
        } catch (Exception e) {
            logger.error("Failed to process incoming message from service_usage_descriptive_analytics_result_queue:",
                    e);
        }
    }

    @RabbitListener(queues = "health_condition_occurrence_descriptive_analytics_result_queue")
    public void receiveHealthConditionOccurrenceDescriptiveAnalyticsResult(String message) {
        try {
            JsonNode rootNode = objectMapper.readTree(message);
            JsonNode analyticsNode = rootNode.get("analytics");
            String description = rootNode.get("description").asText();

            String hashKey = "health_condition_occurrence_descriptive_analytics";
            ValueOperations<String, String> strValOps = stringRedisTemplate.opsForValue();

            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<HealthConditionOccurrenceAnalytics> occurrences = new ArrayList<>();

            if (analyticsNode != null && analyticsNode.isArray()) {
                analyticsNode.forEach(node -> {
                    String healthCondition = node.get("healthCondition").asText();
                    double percentage = node.get("percentage").asDouble();
                    double rateOfChange = node.get("rateOfChange").asDouble();

                    HealthConditionOccurrenceAnalytics occurrence = new HealthConditionOccurrenceAnalytics();
                    occurrence.setHealthCondition(healthCondition);
                    occurrence.setPercentage(percentage);
                    occurrence.setRateOfChange(rateOfChange);

                    occurrences.add(occurrence);
                });
            }

            valOps.set(hashKey, occurrences);
            strValOps.set(hashKey + ":description", description);
        } catch (Exception e) {
            logger.error(
                    "Failed to process incoming message from health_condition_occurrence_descriptive_analytics_result_queue:",
                    e);
        }
    }

    @RabbitListener(queues = "medical_problem_occurrence_descriptive_analytics_result_queue")
    public void receiveMedicalProblemOccurrenceDescriptiveAnalyticsResult(String message) {
        try {
            JsonNode rootNode = objectMapper.readTree(message);
            JsonNode analyticsNode = rootNode.get("analytics");
            String description = rootNode.get("description").asText();

            String hashKey = "medical_problem_occurrence_descriptive_analytics";
            ValueOperations<String, String> strValOps = stringRedisTemplate.opsForValue();

            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<MedicalProblemOccurrenceAnalytics> occurrences = new ArrayList<>();

            if (analyticsNode != null && analyticsNode.isArray()) {
                analyticsNode.forEach(node -> {
                    String medicalProblem = node.get("medicalProblem").asText();
                    double percentage = node.get("percentage").asDouble();
                    double rateOfChange = node.get("rateOfChange").asDouble();

                    MedicalProblemOccurrenceAnalytics occurrence = new MedicalProblemOccurrenceAnalytics();
                    occurrence.setMedicalProblem(medicalProblem);
                    occurrence.setPercentage(percentage);
                    occurrence.setRateOfChange(rateOfChange);

                    occurrences.add(occurrence);
                });
            }

            valOps.set(hashKey, occurrences);
            strValOps.set(hashKey + ":description", description);
        } catch (Exception e) {
            logger.error(
                    "Failed to process incoming message from medical_problem_occurrence_descriptive_analytics_result_queue:",
                    e);
        }

    }

    @RabbitListener(queues = "demographics_analysis_descriptive_analytics_result_queue")
    public void receiveDemographicsAnalysisDescriptiveAnalyticsResult(String message) {
        try {
            JsonNode rootNode = objectMapper.readTree(message);
            JsonNode analyticsNode = rootNode.get("analytics");
            String description = rootNode.get("description").asText();

            String hashKey = "demographics_analysis_descriptive_analytics";
            ValueOperations<String, String> strValOps = stringRedisTemplate.opsForValue();

            redisTemplate.delete(hashKey);
            ValueOperations<String, Object> valOps = redisTemplate.opsForValue();

            List<DemographicsAnalysisAnalytics> age_groups = new ArrayList<>();

            if (analyticsNode != null && analyticsNode.isArray()) {
                analyticsNode.forEach(node -> {
                    String ageGroup = node.get("ageGroup").asText();
                    double percentage = node.get("percentage").asDouble();

                    DemographicsAnalysisAnalytics age_group = new DemographicsAnalysisAnalytics();
                    age_group.setAgeGroup(ageGroup);
                    age_group.setPercentage(percentage);

                    age_groups.add(age_group);
                });
            }

            valOps.set(hashKey, age_groups);
            strValOps.set(hashKey + ":description", description);
        } catch (Exception e) {
            logger.error(
                    "Failed to process incoming message from demographics_analysis_descriptive_analytics_result_queue:",
                    e);
        }
    }

}