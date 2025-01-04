package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.DemographicsAnalysis;
import com.crawler.backend.repository.DemographicsAnalysisRepository;
import com.crawler.backend.service.DemographicsAnalysisService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DemographicsAnalysisServiceImplementation implements DemographicsAnalysisService {

    private final JdbcTemplate jdbcTemplate;

    private final DemographicsAnalysisRepository demographicsAnalysisRepository;

    @Override
    public boolean isTableEmpty() {
        return demographicsAnalysisRepository.count() == 0;
    }

    @Override
    public void saveData(List<DemographicsAnalysis> data) {
        demographicsAnalysisRepository.saveAll(data);
    }

    @Override
    public void truncateAndSaveData(List<DemographicsAnalysis> data) {
        jdbcTemplate.execute("TRUNCATE TABLE demographics_analysis");
        demographicsAnalysisRepository.saveAll(data);
    }

    @Override
    public List<DemographicsAnalysis> getDemographicsAnalysis() {
        return demographicsAnalysisRepository.findAll().stream().collect(Collectors.toList());
    }

}
