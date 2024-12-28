package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.dto.DepartmentDto;

public interface DepartmentService {
    List<DepartmentDto> getDepartments();
}
