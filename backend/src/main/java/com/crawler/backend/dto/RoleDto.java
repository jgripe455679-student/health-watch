package com.crawler.backend.dto;

import java.io.Serializable;
import java.util.Set;

public record RoleDto(Long id, String name, String authority, Set<Long> users, Set<String> permissions) implements Serializable {
}
