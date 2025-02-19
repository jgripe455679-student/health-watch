package com.crawler.backend.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.BMIAnalysisDto;
import com.crawler.backend.model.BMIAnalysis;
import com.crawler.backend.repository.BMIAnalysisRepository;
import com.crawler.backend.service.BMIAnalysisService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BMIAnalysisServiceImplementation implements BMIAnalysisService {

    private final BMIAnalysisRepository bmiAnalysisRepository;

    private final JdbcTemplate jdbcTemplate;

    @Override
    public boolean isTableEmpty() {
        return bmiAnalysisRepository.count() == 0;
    }

    @Override
    public void saveData(List<BMIAnalysis> data) {
        bmiAnalysisRepository.saveAll(data);
    }

    @Override
    public void truncateAndSaveData(List<BMIAnalysis> data) {
        jdbcTemplate.execute("TRUNCATE TABLE bmi_analysis");
        if (bmiAnalysisRepository.count() == 0) {
            bmiAnalysisRepository.saveAll(data);
        }
    }

    @Override
    public List<BMIAnalysis> getAllBMIAnalysis() {
        return bmiAnalysisRepository.findAll().stream().collect(Collectors.toList());
    }

    @Override
    public List<BMIAnalysisDto> getCustomBMIAnalysis() {
        return bmiAnalysisRepository.findCustomBMIAnalysis().stream().collect(Collectors.toList());
    }

    @Override
    public List<BMIAnalysisDto> findCustomBMIAnalysisByDateRange(String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return bmiAnalysisRepository.findCustomBMIAnalysisByDateRange(start, end);
    }
}
