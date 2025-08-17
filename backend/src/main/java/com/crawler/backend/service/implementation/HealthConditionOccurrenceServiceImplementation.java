package com.crawler.backend.service.implementation;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.HealthConditionOccurrence;
import com.crawler.backend.model.HealthConditionOccurrenceAnalytics;
import com.crawler.backend.service.HealthConditionOccurrenceService;

import io.jsonwebtoken.lang.Collections;

@Service
public class HealthConditionOccurrenceServiceImplementation implements HealthConditionOccurrenceService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final StringRedisTemplate stringRedisTemplate;

    DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public HealthConditionOccurrenceServiceImplementation(RedisTemplate<String, Object> redisTemplate,
            StringRedisTemplate stringRedisTemplate) {
        this.redisTemplate = redisTemplate;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<HealthConditionOccurrence> getAllHealthConditionOccurrence() {
        ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
        Object obj = valOps.get("health_condition_occurrence");
        if (obj instanceof List) {
            List<HealthConditionOccurrence> occurrences = (List<HealthConditionOccurrence>) obj;
            return occurrences;
        }
        return Collections.emptyList();
    }

    @Override
    public List<HealthConditionOccurrence> getAllHealthConditionOccurrenceByDateRange(String startDate,
            String endDate) {
        LocalDate start = LocalDate.parse(startDate, fmt);
        LocalDate end = LocalDate.parse(endDate, fmt);
        List<HealthConditionOccurrence> occurrences = this.getAllHealthConditionOccurrence();
        return occurrences.stream()
                .filter(occurrence -> {
                    LocalDate recordDate = LocalDate.parse(occurrence.getRecordDate(), fmt);
                    return (recordDate.isEqual(start) || recordDate.isAfter(start)) &&
                            (recordDate.isEqual(end) || recordDate.isBefore(end));
                })
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<HealthConditionOccurrenceAnalytics> getHealthConditionOccurrenceAnalytics() {
        ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
        Object obj = valOps.get("health_condition_occurrence_descriptive_analytics");
        if (obj instanceof List) {
            List<HealthConditionOccurrenceAnalytics> occurrences = (List<HealthConditionOccurrenceAnalytics>) obj;
            return occurrences.stream()
                    .sorted(Comparator.comparingDouble(HealthConditionOccurrenceAnalytics::getPercentage).reversed())
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public String getHealthConditionOccurrenceDescription() {
        ValueOperations<String, String> valOps = stringRedisTemplate.opsForValue();
        String description = valOps.get("health_condition_occurrence_descriptive_analytics:description");
        if (description != null) {
            return description;
        }
        return "";
    }

    @Override
    public Map<String, Object> getDescriptiveAnalytics() {
        Map<String, Object> descriptive_analytics = new HashMap<String, Object>();
        descriptive_analytics.put("analytics", getHealthConditionOccurrenceAnalytics());
        descriptive_analytics.put("description", getHealthConditionOccurrenceDescription());
        return descriptive_analytics;
    }

}
