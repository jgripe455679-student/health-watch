package com.crawler.backend.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.crawler.backend.enums.Roles;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.test.TestApplication;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
@ContextConfiguration(classes = TestApplication.class)
// @ActiveProfiles("test")
// @AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
// @EntityScan(basePackages = "com.crawler.backend.model")
public class UserRepositoryTest {
    @MockitoBean
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private User user;

    private User admin;

    private Collection<User> userList;

    private Role roleUser;

    private Role roleAdmin;

    @BeforeEach
    void setUp() {
        Role rawUserRole = Role.builder()
                .name(Roles.USER.name())
                .build();
        this.roleUser = entityManager.persistFlushFind(rawUserRole);

        Role rawAdminRole = Role.builder()
                .name(Roles.ADMIN.name())
                .build();
        this.roleAdmin = entityManager.persistFlushFind(rawAdminRole);

        User rawUser = new User();
        rawUser.setUsername("test_user");
        rawUser.setPassword("P@ssw0rd123");
        rawUser.setRole(this.roleUser);
        this.user = entityManager.persistFlushFind(rawUser);

        User rawAdmin = new User();
        rawAdmin.setUsername("test_admin");
        rawAdmin.setPassword("P@ssw0rd123");
        rawAdmin.setRole(roleAdmin);
        this.admin = entityManager.persistFlushFind(rawAdmin);

        this.userList = new ArrayList<>();
        this.userList.add(this.user);
        this.userList.add(this.admin);
    }

    @AfterEach
    void tearDown() {
        user = null;
        roleUser = null;
        admin = null;
        roleAdmin = null;
        userList.clear();
        userRepository.deleteAllInBatch();
    }

    @Test
    void testFindByUsername_Found() throws Exception {
        Optional<User> existingUser = userRepository.findByUsername("test_user");
        assertTrue(existingUser.isPresent());
        assertEquals(existingUser.get().getId(), user.getId());
        assertEquals(existingUser.get().getUsername(), user.getUsername());
    }

    @Test
    void testFindByUsername_NotFound() throws Exception {
        Optional<User> existingUser = userRepository.findByUsername("user");
        assertFalse(existingUser.isPresent());
    }

    @Test
    void testFindByUsernameContaining_ReturnsFilteredAndSortedResults() {
        Sort sortOrder = Sort.by(Sort.Direction.DESC, "createdAt");
        List<User> results = userRepository.findByUsernameContaining("test_", sortOrder);
        assertEquals(userList.size(), results.size());
    }

    @Test
    void testFindByUsernameContaining_ReturnsEmptyListWhenNoMatch() {
        Sort sortOrder = Sort.by(Sort.Direction.DESC, "createdAt");
        List<User> results = userRepository.findByUsernameContaining("non_existent_username", sortOrder);

        assertTrue(results.isEmpty(), "The list should be completely empty when no usernames match");
    }

}
// package com.crawler.backend.repository;

// import static org.assertj.core.api.Assertions.assertThat;

// // import static org.assertj.core.api.Assertions.assertThat;

// import java.time.LocalDateTime;
// import java.util.Optional;

// import org.junit.jupiter.api.AfterEach;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
// import
// org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
// import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
// import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
// import org.springframework.test.context.ActiveProfiles;

// import com.crawler.backend.model.User;

// @ActiveProfiles("test")
// @DataJpaTest
// @AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
// public class UserRepositoryTest {
// @Autowired
// private TestEntityManager entityManager;

// @Autowired
// private UserRepository userRepository;
// User user;

// @BeforeEach
// void setUp() {
// user = new User("test", "test");
// user.setUserDateCreated(LocalDateTime.now());
// entityManager.persistAndFlush(user);
// }

// @AfterEach
// void tearDown() {
// user = null;
// userRepository.deleteAll();
// }

// @Test
// void testFindByUsername_Found() throws Exception {
// Optional<User> existingUser = userRepository.findByUsername("test");
// assertThat(existingUser.isPresent()).isTrue();
// assertThat(existingUser.get().getUserId()).isEqualTo(user.getUserId());
// assertThat(existingUser.get().getUsername()).isEqualTo(user.getUsername());
// }

// @Test
// void testFindByUsername_NotFound() throws Exception {
// Optional<User> existingUser = userRepository.findByUsername("test1");
// assertThat(existingUser.isPresent()).isFalse();
// }
// }
