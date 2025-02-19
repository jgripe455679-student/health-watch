package com.crawler.backend.dto;

import java.io.Serializable;

public record DepartmentUsageDto(String department, Long recordCount) implements Serializable {
}
