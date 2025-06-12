package com.crawler.backend.service;

import java.util.List;
import java.util.Map;

import com.crawler.backend.dto.ServiceUsageDto;
import com.crawler.backend.model.ServiceUsage;
import com.crawler.backend.model.ServiceUsageAnalytics;

public interface ServiceUsageService {
    List<ServiceUsage> getAllServiceUsage();

    List<ServiceUsageDto> getAggregatedServiceUsage(List<ServiceUsage> serviceUsages);

    List<ServiceUsage> getAllServiceUsageByDateRange(List<ServiceUsage> usages, String startDate, String endDate);

    List<ServiceUsageDto> getAggregatedServiceUsageByDateRange(List<ServiceUsage> serviceUsages);

    List<ServiceUsageAnalytics> getServiceUsageAnalytics();

    String getServiceUsageDescription();

    Map<String, Object> getDescriptiveAnalytics();
}