package com.crawler.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.RecordCount;

@Repository
public interface RecordCountRepository extends JpaRepository<RecordCount, Long> {
    
}
