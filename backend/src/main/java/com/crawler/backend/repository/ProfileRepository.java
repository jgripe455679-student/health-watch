package com.crawler.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findByLastNameContaining(String lastName, Sort sort);

    @Query("SELECT p FROM Profile p WHERE " +
            "(p.lastName = :lastName) AND " +
            "(p.firstName = :firstName) AND " +
            "(:middleName IS NULL OR :middleName = '' OR p.middleName = :middleName) AND " +
            "(:suffix IS NULL OR :suffix = '' OR p.suffix = :suffix)")
    Optional<Profile> findProfile(@Param("lastName") String lastName, @Param("firstName") String firstName,
            @Param("middleName") String middleName, @Param("suffix") String suffix);
}
