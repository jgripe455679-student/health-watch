package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.model.BPTrends;

public interface BPTrendsService {

    boolean isTableEmpty();

    void saveData(List<BPTrends> data);

    void truncateAndSaveData(List<BPTrends> data);

    List<BPTrends> getAllBPTrends();

    List<BPTrends> findByRecordDateBetween(String startDate, String endDate);
}
