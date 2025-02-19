package com.crawler.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crawler.backend.model.BPTrends;

public interface BPTrendsRepository extends JpaRepository<BPTrends, Long> {
    List<BPTrends> findByRecordDateBetween(LocalDate startDate, LocalDate endDate);
}
