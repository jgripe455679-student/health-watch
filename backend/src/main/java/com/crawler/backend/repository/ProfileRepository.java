package com.crawler.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findByLastNameContaining(String lastName);

    Optional<Profile> findByLastNameAndFirstNameOrMiddleNameOrSuffix(String lastName, String firstName,
            String middleName, String suffix);
}
