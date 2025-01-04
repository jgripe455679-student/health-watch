package com.crawler.backend.controller;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.dto.ProfileDto;
import com.crawler.backend.dto.RecordResponseDto;
import com.crawler.backend.messaging.RabbitMQProducer;
import com.crawler.backend.service.ProfileService;
import com.crawler.backend.service.RecordService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/rabbitmq")
@RequiredArgsConstructor
public class RabbitMQController {

    private final RecordService recordService;

    private final ProfileService profileService;

    private final RabbitMQProducer rabbitMQProducer;

    private final ObjectMapper objectMapper;

    @GetMapping("/send")
    public String send() throws Exception {
        List<RecordResponseDto> records = recordService.getRecords(Sort.by(Sort.Direction.DESC, "createdAt"));
        List<ProfileDto> profiles = profileService.getProfiles(Sort.by(Sort.Direction.DESC, "createdAt"));

        String recordsJson = objectMapper.writeValueAsString(records);
        String profilesJson = objectMapper.writeValueAsString(profiles);

        rabbitMQProducer.sendRawRecords(recordsJson);
        rabbitMQProducer.sendRawProfiles(profilesJson);
        return "Data sent to RabbitMQ!";
    }

}
