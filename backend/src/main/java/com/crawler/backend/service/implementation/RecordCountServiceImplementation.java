package com.crawler.backend.service.implementation;

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
        recordCountRepository.saveAll(data);
    }

    @Override
    public List<RecordCount> getAllRecordCount() {
        return recordCountRepository.findAll().stream().collect(Collectors.toList());
    }

}
