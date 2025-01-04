package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.DepartmentUsage;
import com.crawler.backend.repository.DepartmentUsageRepository;
import com.crawler.backend.service.DepartmentUsageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentUsageServiceImplementation implements DepartmentUsageService {

    private final DepartmentUsageRepository departmentUsageRepository;

    private final JdbcTemplate jdbcTemplate;

    @Override
    public boolean isTableEmpty() {
        return departmentUsageRepository.count() == 0;
    }

    @Override
    public void saveData(List<DepartmentUsage> data) {
        departmentUsageRepository.saveAll(data);
    }

    @Override
    public void truncateAndSaveData(List<DepartmentUsage> data) {
        jdbcTemplate.execute("TRUNCATE TABLE department_usage");
        departmentUsageRepository.saveAll(data);
    }

    @Override
    public List<DepartmentUsage> getAllDepartmentUsage() {
        return departmentUsageRepository.findAll().stream().collect(Collectors.toList());
    }
}
