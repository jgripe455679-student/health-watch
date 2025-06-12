package com.crawler.backend.controller;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.dto.ProfileDto;
import com.crawler.backend.dto.RecordResponseDto;
import com.crawler.backend.messaging.RabbitMQProducer;
import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.model.HealthConditionOccurrence;
import com.crawler.backend.model.MedicalProblemOccurrence;
import com.crawler.backend.model.RecordCount;
import com.crawler.backend.model.ServiceUsage;
import com.crawler.backend.service.ProfileService;
import com.crawler.backend.service.RecordService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/rabbitmq")
@RequiredArgsConstructor
public class RabbitMQController {

    private final RecordService recordService;

    private final ProfileService profileService;

    private final RabbitMQProducer rabbitMQProducer;

    private final ObjectMapper objectMapper;

    @GetMapping("/records/send")
    public void sendRecords() throws Exception {
        List<RecordResponseDto> records = recordService.getRecords(Sort.by(Sort.Direction.DESC, "createdAt"));

        String recordsJson = objectMapper.writeValueAsString(records);

        rabbitMQProducer.sendRawRecords(recordsJson);
    }

    @GetMapping("/profiles/send")
    public void sendProfiles() throws Exception {
        List<ProfileDto> profiles = profileService.getProfiles(Sort.by(Sort.Direction.DESC, "createdAt"));

        String profilesJson = objectMapper.writeValueAsString(profiles);

        rabbitMQProducer.sendRawProfiles(profilesJson);
    }

    @PostMapping("/record-count/analytics")
    public void sendAllRecordCount(@RequestBody List<RecordCount> recordCount) throws Exception {
        String recordCountJson = objectMapper.writeValueAsString(recordCount);
        rabbitMQProducer.sendRecordCount(recordCountJson);
    }

    @PostMapping("/service-usage/analytics")
    public void sendAllServiceUsage(@RequestBody List<ServiceUsage> serviceUsages) throws Exception {
        String serviceUsagesJson = objectMapper.writeValueAsString(serviceUsages);
        rabbitMQProducer.sendServiceUsage(serviceUsagesJson);
    }

    @PostMapping("/health-condition-occurrence/analytics")
    public void sendAllHealthConditionOccurrence(
            @RequestBody List<HealthConditionOccurrence> healthConditionOccurrences) throws Exception {
        String healthConditionOccurrencesJson = objectMapper.writeValueAsString(healthConditionOccurrences);
        rabbitMQProducer.sendHealthConditionOccurrence(healthConditionOccurrencesJson);
    }

    @PostMapping("/medical-problem-occurrence/analytics")
    public void sendAllMedicalProblemOccurrence(@RequestBody List<MedicalProblemOccurrence> medicalProblemOccurrences)
            throws Exception {
        String medicalProblemOccurrenceJson = objectMapper.writeValueAsString(medicalProblemOccurrences);
        rabbitMQProducer.sendMedicalProblemOccurrence(medicalProblemOccurrenceJson);
    }

    @PostMapping("/demographics-analysis/analytics")
    public void sendAllDemographicsAnalysis(@RequestBody List<DemographicsAnalysis> demographicsAnalysis)
            throws Exception {
        String demographicsAnalysisJson = objectMapper.writeValueAsString(demographicsAnalysis);
        rabbitMQProducer.sendDemographicsAnalysis(demographicsAnalysisJson);
    }

}
