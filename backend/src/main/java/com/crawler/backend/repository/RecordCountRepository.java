package com.crawler.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.RecordCount;

@Repository
public interface RecordCountRepository extends JpaRepository<RecordCount, Long> {
    List<RecordCount> findByRecordDateBetween(LocalDate startDate, LocalDate endDate);
}
