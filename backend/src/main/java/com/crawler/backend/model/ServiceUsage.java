package com.crawler.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceUsage {

    private String recordDate;
    
    private String service;
    
    private Long recordCount;
    
}
