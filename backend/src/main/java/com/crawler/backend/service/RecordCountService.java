package com.crawler.backend.service;

import java.util.List;
import java.util.Map;

import com.crawler.backend.model.RecordCount;
import com.crawler.backend.model.RecordCountAnalytics;

public interface RecordCountService {
    List<RecordCount> getAllRecordCount();

    List<RecordCount> getAllRecordCountByDateRange(List<RecordCount> records, String startDate, String endDate);

    List<RecordCountAnalytics> getRecordCountAnalytics();

    String getRecordCountDescription();

    Map<String, Object> getDescriptiveAnalytics();
}
