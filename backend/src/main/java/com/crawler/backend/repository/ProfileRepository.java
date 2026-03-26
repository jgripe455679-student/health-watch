package com.crawler.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.crawler.backend.model.Profile;
import com.crawler.backend.model.User;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
        List<Profile> findByLastNameContaining(String lastName, Sort sort);

        @Query(value = "SELECT * FROM tbl_profiles p WHERE " +
                        "(p.last_name = :lastName) AND " +
                        "(p.first_name LIKE '%' || :firstName || '%') AND " +
                        "(p.middle_name = :middleName OR (:middleName IS NULL OR :middleName = '')) AND "
                        +
                        "(p.suffix = :suffix OR (:suffix IS NULL OR :suffix = '')) AND "
                        + "(p.date_of_birth = :dateOfBirth)", nativeQuery = true)
        Optional<Profile> findProfile(
                        @Param("lastName") String lastName,
                        @Param("firstName") String firstName,
                        @Param("middleName") String middleName,
                        @Param("suffix") String suffix,
                        @Param("dateOfBirth") LocalDate dateOfBirth);

        List<Profile> findByCreatedBy(User createdBy);
        List<Profile> findByUpdatedBy(User updatedBy);
}
