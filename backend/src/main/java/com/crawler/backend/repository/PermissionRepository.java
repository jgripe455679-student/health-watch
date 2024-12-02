package com.crawler.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crawler.backend.model.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

}
