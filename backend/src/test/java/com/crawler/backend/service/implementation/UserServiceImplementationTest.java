// package com.crawler.backend.service.implementation;

// import static org.mockito.Mockito.mock;
// import static org.mockito.Mockito.verify;
// import static org.mockito.Mockito.when;

// import java.time.LocalDateTime;

// import org.junit.jupiter.api.AfterEach;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.mockito.junit.jupiter.MockitoExtension;

// import com.crawler.backend.model.User;
// import com.crawler.backend.repository.UserRepository;
// import com.crawler.backend.service.UserService;

// @ExtendWith(MockitoExtension.class)
// public class UserServiceImplementationTest {
//     @Mock
//     private UserRepository userRepository;
//     @InjectMocks
//     private UserService userService;
//     AutoCloseable autoCloseable;
//     User user;

//     @BeforeEach
//     void setUp() {
//         autoCloseable = MockitoAnnotations.openMocks(this);
//         userService = new UserServiceImplementation(userRepository);
//         user = new User("test", "test");
//         user.setUserDateCreated(LocalDateTime.now());
//     }

//     @AfterEach
//     void tearDown() throws Exception {
//         autoCloseable.close();
//     }

//     @Test
//     void testCreateUser() {
//         mock();
//         when(userRepository.save(user)).thenReturn(user);
//         verify(userService).createUser(user);
//     }
// }
