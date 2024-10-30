package com.crawler.backend.dto;

import java.io.Serializable;
import java.util.Set;

public record UserDTO(
        Long id,
        String username,
        String password,
        String role,
        Set<String> permissions) implements Serializable {

}
