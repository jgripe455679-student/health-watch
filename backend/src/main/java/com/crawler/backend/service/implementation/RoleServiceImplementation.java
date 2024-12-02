package com.crawler.backend.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.crawler.backend.dto.RoleDto;
import com.crawler.backend.mapper.RoleMapper;
import com.crawler.backend.repository.RoleRepository;
import com.crawler.backend.service.RoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleServiceImplementation implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public List<RoleDto> getRoles() {
        return roleRepository.findAll().stream().map(RoleMapper::roleToRoleDto).collect(Collectors.toList());
    }

}
