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
        rabbitTemplate.convertAndSend("raw_profiles_exchange", "profile_demographics_analysis_routing_key", profilesJson);
    }

}
