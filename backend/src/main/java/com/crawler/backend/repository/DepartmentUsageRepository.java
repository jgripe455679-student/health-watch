package com.crawler.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.crawler.backend.dto.DepartmentUsageDto;
import com.crawler.backend.model.DepartmentUsage;

@Repository
public interface DepartmentUsageRepository extends JpaRepository<DepartmentUsage, Long> {
        @Query("SELECT new com.crawler.backend.dto.DepartmentUsageDto(d.department, SUM(d.recordCount)) " +
                        "FROM DepartmentUsage d " +
                        "GROUP BY d.department " +
                        "ORDER BY SUM(d.recordCount) DESC")
        List<DepartmentUsageDto> findDepartmentRecordCounts();

        @Query("SELECT new com.crawler.backend.dto.DepartmentUsageDto(" +
                        "d.department, " +
                        "SUM(d.recordCount)) " +
                        "FROM DepartmentUsage d " +
                        "WHERE d.recordDate BETWEEN :startDate AND :endDate " +
                        "GROUP BY d.department " +
                        "ORDER BY SUM(d.recordCount) DESC")
        List<DepartmentUsageDto> findDepartmentRecordCountsByDateRange(@Param("startDate") LocalDate startDate,
                        @Param("endDate") LocalDate endDate);
}
