package com.crawler.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {   
}
