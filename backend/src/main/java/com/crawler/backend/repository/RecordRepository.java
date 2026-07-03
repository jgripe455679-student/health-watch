package com.crawler.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.crawler.backend.model.Record;
import com.crawler.backend.model.User;

public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findByRecordDateBetween(LocalDate startDate, LocalDate endDate, Sort sort);
    List<Record> findByCreatedBy(User createdBy);
    List<Record> findByUpdatedBy(User updatedBy);
}
