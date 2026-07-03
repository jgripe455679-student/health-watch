package com.crawler.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crawler.backend.model.Token;

public interface TokenRepository extends JpaRepository<Token, Long> {
}
