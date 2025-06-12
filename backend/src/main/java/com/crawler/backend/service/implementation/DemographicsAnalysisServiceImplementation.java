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

import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.model.DemographicsAnalysisAnalytics;
import com.crawler.backend.service.DemographicsAnalysisService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DemographicsAnalysisServiceImplementation implements DemographicsAnalysisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final StringRedisTemplate stringRedisTemplate;

    @SuppressWarnings("unchecked")
    @Override
    public List<DemographicsAnalysis> getAllDemographicsAnalysis() {
        ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
        Object obj = valOps.get("demographics_analysis");
        if (obj instanceof List) {
            List<DemographicsAnalysis> profiles = (List<DemographicsAnalysis>) obj;
            return profiles.stream()
                    .sorted(Comparator.comparingDouble(DemographicsAnalysis::getPercentage).reversed())
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<DemographicsAnalysisAnalytics> getDemographicsAnalysisAnalytics() {
        ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
        Object obj = valOps.get("demographics_analysis_descriptive_analytics");
        if (obj instanceof List) {
            List<DemographicsAnalysisAnalytics> age_groups = (List<DemographicsAnalysisAnalytics>) obj;
            return age_groups.stream()
                    .sorted(Comparator.comparing(DemographicsAnalysisAnalytics::getPercentage))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public String getDemographicsAnalysisDescription() {
        ValueOperations<String, String> valOps = stringRedisTemplate.opsForValue();
        String description = valOps.get("demographics_analysis_descriptive_analytics:description");
        if (description != null) {
            return description;
        }
        return "";
    }

    @Override
    public Map<String, Object> getDescriptiveAnalytics() {
        Map<String, Object> descriptive_analytics = new HashMap<String, Object>();
        descriptive_analytics.put("analytics", this.getDemographicsAnalysisAnalytics());
        descriptive_analytics.put("description", this.getDemographicsAnalysisDescription());
        return descriptive_analytics;
    }

}
