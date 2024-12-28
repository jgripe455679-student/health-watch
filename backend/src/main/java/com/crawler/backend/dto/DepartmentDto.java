package com.crawler.backend.dto;

import java.io.Serializable;
import java.util.Set;

public record DepartmentDto(Long id, String name, Set<String> services) implements Serializable {

}
