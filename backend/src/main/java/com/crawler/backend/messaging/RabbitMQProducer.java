package com.crawler.backend.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RabbitMQProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendRawRecords(String recordsJson) {
        rabbitTemplate.convertAndSend("raw_records_exchange", "", recordsJson);
    }

    public void sendRawProfiles(String profilesJson) {
        rabbitTemplate.convertAndSend("raw_profiles_exchange", "profile_demographics_analysis_routing_key",
                profilesJson);
    }

    public void sendRecordCount(String recordCountJson) {
        rabbitTemplate.convertAndSend("record_count_exchange", "record_count_descriptive_analytics_routing_key",
                recordCountJson);
    }

    public void sendServiceUsage(String serviceUsageJson) {
        rabbitTemplate.convertAndSend("service_usage_exchange", "service_usage_descriptive_analytics_routing_key",
                serviceUsageJson);
    }

    public void sendHealthConditionOccurrence(String healthConditionOccurrenceJson) {
        rabbitTemplate.convertAndSend("health_condition_occurrence_exchange",
                "health_condition_occurrence_descriptive_analytics_routing_key", healthConditionOccurrenceJson);
    }

    public void sendMedicalProblemOccurrence(String medicalProblemOccurrenceJson) {
        rabbitTemplate.convertAndSend("medical_problem_occurrence_exchange",
                "medical_problem_occurrence_descriptive_analytics_routing_key", medicalProblemOccurrenceJson);
    }

    public void sendDemographicsAnalysis(String demographicsAnalysisJson) {
        rabbitTemplate.convertAndSend("demographics_analysis_exchange", "demographics_analysis_descriptive_analytics_routing_key", demographicsAnalysisJson);
    }

}
