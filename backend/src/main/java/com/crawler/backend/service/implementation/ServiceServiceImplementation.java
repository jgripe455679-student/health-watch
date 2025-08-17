package com.crawler.backend.service.implementation;

import org.springframework.stereotype.Service;

import com.crawler.backend.repository.ServiceRepository;
import com.crawler.backend.service.ServiceService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceServiceImplementation implements ServiceService {

    private final ServiceRepository serviceRepository;

    @Override
    public Long getServiceCount() {
        return serviceRepository.count();
    }

}
