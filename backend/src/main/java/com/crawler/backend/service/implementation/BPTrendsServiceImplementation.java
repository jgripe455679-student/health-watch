package com.crawler.backend.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.BPTrends;
import com.crawler.backend.repository.BPTrendsRepository;
import com.crawler.backend.service.BPTrendsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BPTrendsServiceImplementation implements BPTrendsService {

    private final BPTrendsRepository bpTrendsRepository;

    private final JdbcTemplate jdbcTemplate;

    @Override
    public boolean isTableEmpty() {
        return bpTrendsRepository.count() == 0;
    }

    @Override
    public void saveData(List<BPTrends> data) {
        bpTrendsRepository.saveAll(data);
    }

    @Override
    public void truncateAndSaveData(List<BPTrends> data) {
        jdbcTemplate.execute("TRUNCATE TABLE bp_trends");
        if (bpTrendsRepository.count() == 0) {
            bpTrendsRepository.saveAll(data);
        }
    }

    @Override
    public List<BPTrends> getAllBPTrends() {
        return bpTrendsRepository.findAll().stream().collect(Collectors.toList());
    }

    @Override
    public List<BPTrends> findByRecordDateBetween(String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return bpTrendsRepository.findByRecordDateBetween(start, end);
    }

}
