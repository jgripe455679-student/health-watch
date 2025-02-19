package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.dto.DepartmentUsageDto;
import com.crawler.backend.model.DepartmentUsage;

public interface DepartmentUsageService {

    boolean isTableEmpty();

    void saveData(List<DepartmentUsage> data);

    void truncateAndSaveData(List<DepartmentUsage> data);

    List<DepartmentUsage> getAllDepartmentUsage();

    List<DepartmentUsageDto> getFilteredDepartmentUsage();

    List<DepartmentUsageDto> findDepartmentRecordCountsByDateRange(String startDate, String endDate);
}
