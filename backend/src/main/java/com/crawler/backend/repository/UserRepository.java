package com.crawler.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.crawler.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByUsernameContaining(String username, Sort sort);
    List<User> findByCreatedBy(User createdBy);
    List<User> findByUpdatedBy(User updatedBy);
}