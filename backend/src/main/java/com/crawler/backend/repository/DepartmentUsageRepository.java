package com.crawler.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.DepartmentUsage;

@Repository
public interface DepartmentUsageRepository extends JpaRepository<DepartmentUsage, Long> {
}
