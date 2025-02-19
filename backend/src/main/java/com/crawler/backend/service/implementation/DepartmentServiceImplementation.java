package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.crawler.backend.dto.DepartmentDto;
import com.crawler.backend.mapper.DepartmentMapper;
import com.crawler.backend.repository.DepartmentRepository;
import com.crawler.backend.service.DepartmentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImplementation implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentDto> getDepartments() {
        return departmentRepository.findAll().stream().map(DepartmentMapper::departmentToDepartmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public Long getDepartmentCount() {
        return departmentRepository.count();
    }

}
