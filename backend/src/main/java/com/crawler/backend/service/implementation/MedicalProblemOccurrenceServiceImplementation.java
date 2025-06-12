package com.crawler.backend.service.implementation;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.MedicalProblemOccurrence;
import com.crawler.backend.model.MedicalProblemOccurrenceAnalytics;
import com.crawler.backend.service.MedicalProblemOccurrenceService;

@Service
public class MedicalProblemOccurrenceServiceImplementation implements MedicalProblemOccurrenceService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final StringRedisTemplate stringRedisTemplate;

    public MedicalProblemOccurrenceServiceImplementation(RedisTemplate<String, Object> redisTemplate,
            StringRedisTemplate stringRedisTemplate) {
        this.redisTemplate = redisTemplate;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<MedicalProblemOccurrence> getAllMedicalProblemOccurrence() {
        ValueOperations<String, Object> redisValOps = redisTemplate.opsForValue();
        Object obj = redisValOps.get("medical_problem_occurrence");
        if (obj instanceof List) {
            return (List<MedicalProblemOccurrence>) obj;
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<MedicalProblemOccurrence> getFilteredMedicalProblemOccurrence(List<MedicalProblemOccurrence> records,
            String healthCondition) {
        return records.stream()
                .filter(record -> healthCondition.equals(record.getHealthCondition()))
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<MedicalProblemOccurrenceAnalytics> getMedicalProblemOccurrenceAnalytics() {
        ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
        Object obj = valOps.get("medical_problem_occurrence_descriptive_analytics");
        if (obj instanceof List) {
            List<MedicalProblemOccurrenceAnalytics> occurrences = (List<MedicalProblemOccurrenceAnalytics>) obj;
            return occurrences.stream()
                    .sorted(Comparator.comparingDouble(MedicalProblemOccurrenceAnalytics::getPercentage).reversed())
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public String getMedicalProblemOccurrenceDescription() {
        ValueOperations<String, String> valOps = stringRedisTemplate.opsForValue();
        String description = valOps.get("medical_problem_occurrence_descriptive_analytics:description");
        if (description != null) {
            return description;
        }
        return "";
    }

    @Override
    public Map<String, Object> getDescriptiveAnalytics() {
        Map<String, Object> descriptive_analytics = new HashMap<String, Object>();
        descriptive_analytics.put("analytics", getMedicalProblemOccurrenceAnalytics());
        descriptive_analytics.put("description", getMedicalProblemOccurrenceDescription());
        return descriptive_analytics;
    }

}
