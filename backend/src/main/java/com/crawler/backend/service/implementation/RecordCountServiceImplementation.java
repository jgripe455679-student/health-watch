package com.crawler.backend.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.crawler.backend.model.RecordCount;
import com.crawler.backend.repository.RecordCountRepository;
import com.crawler.backend.service.RecordCountService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecordCountServiceImplementation implements RecordCountService {

    private final JdbcTemplate jdbcTemplate;

    private final RecordCountRepository recordCountRepository;

    @Override
    public boolean isTableEmpty() {
        return recordCountRepository.count() == 0;
    }

    @Override
    public void saveData(List<RecordCount> data) {
        recordCountRepository.saveAll(data);
    }

    @Override
    public void truncateAndSaveData(List<RecordCount> data) {
        jdbcTemplate.execute("TRUNCATE TABLE record_count");
        if (recordCountRepository.count() == 0) {
            recordCountRepository.saveAll(data);
        }
    }

    @Override
    public List<RecordCount> getAllRecordCount() {
        return recordCountRepository.findAll().stream().collect(Collectors.toList());
    }

    @Override
    public List<RecordCount> findByRecordDateBetween(String startDate, String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return recordCountRepository.findByRecordDateBetween(start, end);
    }

}
