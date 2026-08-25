package com.crawler.backend.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ContextConfiguration;

import com.crawler.backend.enums.Roles;
import com.crawler.backend.model.Profile;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.test.TestApplication;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@ContextConfiguration(classes = TestApplication.class)
public class ProfileRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProfileRepository profileRepository;

    private User test_admin;

    private Collection<Profile> profileList;

    private Role roleAdmin;

    private Profile test_profile;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @BeforeEach
    void setUp() {
        Role rawAdminRole = Role.builder()
                .name(Roles.ADMIN.name())
                .build();
        this.roleAdmin = entityManager.persistAndFlush(rawAdminRole);

        Profile rawProfile = new Profile();
        rawProfile.setFirstName("John");
        rawProfile.setLastName("Green");
        rawProfile.setDateOfBirth(LocalDate.parse("1998-01-01", FORMATTER));
        rawProfile.setAge((short) 28);
        rawProfile.setGender("Male");
        rawProfile.setMaritalStatus("Single");
        rawProfile.setAddress("1487 NOSTRAND AVE., BROOKLYN, NEW YORK");
        rawProfile.setMobileNumber("09193753942");
        rawProfile.setCreatedBy(test_admin);
        this.test_profile = entityManager.persistAndFlush(rawProfile);

        this.profileList = new ArrayList<>();
        this.profileList.add(this.test_profile);
    }

    @AfterEach
    void tearDown() {
        test_admin = null;
        roleAdmin = null;
        test_profile = null;
        profileList.clear();
        profileRepository.deleteAllInBatch();
    }

    @Test
    void testfindByLastNameContaining_ReturnsFilteredAndSortedResults() throws Exception {
        Sort sortOrder = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Profile> results = profileRepository.findByLastNameContaining("Green", sortOrder);
        assertEquals(profileList.size(), results.size());
    }

    @Test
    void testFindByLastNameContaining_ReturnsEmptyListWhenNoMatch() {
        Sort sortOrder = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Profile> results = profileRepository.findByLastNameContaining("non_existent_last_name", sortOrder);
        assertTrue(results.isEmpty(), "The list should be completely empty when no usernames match");
    }

    @Test
    void testFindProfile_Found() throws Exception {
        Optional<Profile> existingProfile = profileRepository.findProfile("Green", "John", null, null,
                LocalDate.parse("1998-01-01", FORMATTER));
        assertTrue(existingProfile.isPresent());
        assertEquals(existingProfile.get().getId(), test_profile.getId());
    }

}