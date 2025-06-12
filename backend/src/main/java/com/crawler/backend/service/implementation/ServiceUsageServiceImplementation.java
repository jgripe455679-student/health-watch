package com.crawler.backend.service.implementation;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.ServiceUsageDto;
import com.crawler.backend.model.ServiceUsage;
import com.crawler.backend.model.ServiceUsageAnalytics;
import com.crawler.backend.service.ServiceUsageService;

import io.jsonwebtoken.lang.Collections;

@Service
public class ServiceUsageServiceImplementation implements ServiceUsageService {

        private final RedisTemplate<String, Object> redisTemplate;
        private final StringRedisTemplate stringRedisTemplate;

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        public ServiceUsageServiceImplementation(RedisTemplate<String, Object> redisTemplate,
                        StringRedisTemplate stringRedisTemplate) {
                this.redisTemplate = redisTemplate;
                this.stringRedisTemplate = stringRedisTemplate;
        }

        @SuppressWarnings("unchecked")
        @Override
        public List<ServiceUsage> getAllServiceUsage() {
                ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
                Object obj = valOps.get("service_usage");
                if (obj instanceof List) {
                        List<ServiceUsage> usages = (List<ServiceUsage>) obj;
                        return usages;
                }
                return Collections.emptyList();
        }

        @Override
        public List<ServiceUsageDto> getAggregatedServiceUsage(List<ServiceUsage> serviceUsages) {
                return serviceUsages.stream()
                                .collect(Collectors.groupingBy(
                                                ServiceUsage::getService,
                                                Collectors.summingLong(ServiceUsage::getRecordCount)))
                                .entrySet().stream()
                                .sorted(
                                                Map.Entry.<String, Long>comparingByValue()
                                                                .reversed())
                                .map(e -> new ServiceUsageDto(e.getKey(), e.getValue()))
                                .collect(Collectors.toList());
        }

        @Override
        public List<ServiceUsage> getAllServiceUsageByDateRange(List<ServiceUsage> usages, String startDate,
                        String endDate) {
                LocalDate start = LocalDate.parse(startDate, fmt);
                LocalDate end = LocalDate.parse(endDate, fmt);
                return usages.stream()
                                .filter(record -> {
                                        LocalDate recordDate = LocalDate.parse(record.getRecordDate(), fmt);
                                        return (recordDate.isEqual(start) || recordDate.isAfter(start)) &&
                                                        (recordDate.isEqual(end) || recordDate.isBefore(end));
                                })
                                .collect(Collectors.toList());
        }

        @Override
        public List<ServiceUsageDto> getAggregatedServiceUsageByDateRange(List<ServiceUsage> serviceUsages) {
                return serviceUsages.stream()
                                .collect(Collectors.groupingBy(ServiceUsage::getService,
                                                Collectors.summingLong(ServiceUsage::getRecordCount)))
                                .entrySet().stream()
                                .sorted(Map.Entry.<String, Long>comparingByValue()
                                                .reversed())
                                .map(e -> new ServiceUsageDto(e.getKey(), e.getValue()))
                                .collect(Collectors.toList());
        }

        @SuppressWarnings("unchecked")
        @Override
        public List<ServiceUsageAnalytics> getServiceUsageAnalytics() {
                ValueOperations<String, Object> valOps = redisTemplate.opsForValue();
                Object obj = valOps.get("service_usage_descriptive_analytics");
                if (obj instanceof List) {
                        List<ServiceUsageAnalytics> usages = (List<ServiceUsageAnalytics>) obj;
                        return usages;
                }
                return Collections.emptyList();
        }

        @Override
        public String getServiceUsageDescription() {
                ValueOperations<String, String> valOps = stringRedisTemplate.opsForValue();
                return valOps.get("service_usage_descriptive_analytics:description");
        }

        @Override
        public Map<String, Object> getDescriptiveAnalytics() {
                Map<String, Object> descriptive_analytics = new HashMap<String, Object>();
                descriptive_analytics.put("analytics", getServiceUsageAnalytics());
                descriptive_analytics.put("description", getServiceUsageDescription());
                return descriptive_analytics;
        }

}
