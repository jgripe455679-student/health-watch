package com.crawler.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;

// import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import com.crawler.backend.model.User;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;
    User user;

    @BeforeEach
    void setUp() {
        user = new User("test", "test");
        user.setUserDateCreated(LocalDateTime.now());
        entityManager.persistAndFlush(user);
    }

    @AfterEach
    void tearDown() {
        user = null;
        userRepository.deleteAll();
    }

    @Test
    void testFindByUsername_Found() throws Exception {
        Optional<User> existingUser = userRepository.findByUsername("test");
        assertThat(existingUser.isPresent()).isTrue();
        assertThat(existingUser.get().getUserId()).isEqualTo(user.getUserId());
        assertThat(existingUser.get().getUsername()).isEqualTo(user.getUsername());
    }

    @Test
    void testFindByUsername_NotFound() throws Exception {
        Optional<User> existingUser = userRepository.findByUsername("test1");
        assertThat(existingUser.isPresent()).isFalse();
    }
}
