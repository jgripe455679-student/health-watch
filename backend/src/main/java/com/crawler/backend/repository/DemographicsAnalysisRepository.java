package com.crawler.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.DemographicsAnalysis;

@Repository
public interface DemographicsAnalysisRepository extends JpaRepository<DemographicsAnalysis, Long> {

}
