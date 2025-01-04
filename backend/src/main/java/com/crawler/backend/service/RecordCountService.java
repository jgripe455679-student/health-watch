package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.model.RecordCount;

public interface RecordCountService {
    boolean isTableEmpty();
    
    void saveData(List<RecordCount> data);

    void truncateAndSaveData(List<RecordCount> data);

    List<RecordCount> getAllRecordCount();
}
