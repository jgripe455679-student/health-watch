package com.crawler.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.crawler.backend.dto.BMIAnalysisDto;
import com.crawler.backend.model.BMIAnalysis;

public interface BMIAnalysisRepository extends JpaRepository<BMIAnalysis, Long> {
        @Query("SELECT new com.crawler.backend.dto.BMIAnalysisDto(b.bmiCategory, SUM(b.recordCount), (SUM(b.recordCount) / (SELECT SUM(b2.recordCount) FROM BMIAnalysis b2) * 100.0)) "
                        +
                        "FROM BMIAnalysis b " +
                        "GROUP BY b.bmiCategory " +
                        "ORDER BY SUM(b.recordCount) DESC")
        List<BMIAnalysisDto> findCustomBMIAnalysis();

        @Query("SELECT new com.crawler.backend.dto.BMIAnalysisDto(b.bmiCategory, SUM(b.recordCount), (SUM(b.recordCount) / (SELECT SUM(b2.recordCount) FROM BMIAnalysis b2) * 100.0)) "
                        +
                        "FROM BMIAnalysis b " +
                        "WHERE b.recordDate BETWEEN :startDate AND :endDate " +
                        "GROUP BY b.bmiCategory " +
                        "ORDER BY SUM(b.recordCount) DESC")
        List<BMIAnalysisDto> findCustomBMIAnalysisByDateRange(@Param("startDate") LocalDate startDate,
                        @Param("endDate") LocalDate endDate);
}
