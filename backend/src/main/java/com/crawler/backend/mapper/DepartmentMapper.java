package com.crawler.backend.mapper;

import java.util.stream.Collectors;

import com.crawler.backend.dto.DepartmentDto;
import com.crawler.backend.model.Department;
import com.crawler.backend.model.Service;

public class DepartmentMapper {
    public static DepartmentDto departmentToDepartmentDto(Department department) {
        return new DepartmentDto(department.getId(), department.getName(),
                department.getServices().stream().map(Service::getName).collect(Collectors.toSet()));
    }
}
