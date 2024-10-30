package com.crawler.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {    
}