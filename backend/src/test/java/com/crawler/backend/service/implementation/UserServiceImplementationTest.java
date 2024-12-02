// package com.crawler.backend.service.implementation;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.doAnswer;
// import static org.mockito.Mockito.mock;
// import static org.mockito.Mockito.never;
// import static org.mockito.Mockito.verify;
// import static org.mockito.Mockito.when;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.Collection;
// import java.util.List;
// import java.util.Optional;

// import org.assertj.core.api.Assertions;
// import org.junit.jupiter.api.AfterEach;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.Answers;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.Mockito;
// import org.mockito.MockitoAnnotations;
// import org.mockito.junit.jupiter.MockitoExtension;

// import com.crawler.backend.dto.UserDetailsDTO;
// import com.crawler.backend.dto.UserUpdateDTO;
// import com.crawler.backend.exception.NoUsersFoundException;
// import com.crawler.backend.exception.UserNotFoundException;
// import com.crawler.backend.exception.UsernameAlreadyExistException;
// import com.crawler.backend.model.User;
// import com.crawler.backend.repository.UserRepository;

// @ExtendWith(MockitoExtension.class)
// public class UserServiceImplementationTest {
//     @Mock
//     private UserRepository userRepository;
//     @InjectMocks
//     private UserServiceImplementation userService;
//     AutoCloseable autoCloseable;
//     User user;
//     UserUpdateDTO userUpdateRequest;
//     Collection<User> existingUsers;

//     @BeforeEach
//     void setUp() {
//         autoCloseable = MockitoAnnotations.openMocks(this);
//         userService = new UserServiceImplementation(userRepository);
//         user = new User("test", "test");
//         user.setUserDateCreated(LocalDateTime.now());
//         userUpdateRequest = new UserUpdateDTO("test1", "test", "test", true);
//         existingUsers = new ArrayList<>();
//         existingUsers.add(new User("test", "test"));
//         existingUsers.add(new User("test1", "test1"));
//     }

//     @AfterEach
//     void tearDown() throws Exception {
//         autoCloseable.close();
//     }

//     @Test
//     void testCreateUser_Success() {
//         mock(User.class);
//         mock(UserRepository.class);
//         when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.empty());
//         userService.createUser(user);
//         verify(userRepository).save(user);
//     }

//     @Test
//     void testCreateUser_ThrowsException_WhenUsernameAlreadyExist() {
//         mock(User.class);
//         mock(UserRepository.class);
//         when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
//         Assertions.assertThatThrownBy(() -> userService.createUser(user))
//                 .isInstanceOf(UsernameAlreadyExistException.class).hasMessage("Username already exist");
//         verify(userRepository, never()).save(user);
//     }

//     @Test
//     void testUpdateUser_Success() {
//         mock(UserRepository.class);
//         mock(UserUpdateDTO.class);
//         mock(User.class);
//         when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));
//         when(userRepository.findByUsername(userUpdateRequest.getUsername())).thenReturn(Optional.empty());
//         userService.updateUser(user.getUserId(), userUpdateRequest);
//         verify(userRepository).save(user);
//     }

//     @Test
//     void testUpdateUser_ThrowsException_WhenUserNotFound() {
//         mock(UserRepository.class);
//         mock(UserUpdateDTO.class);
//         mock(User.class);
//         when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());
//         Assertions.assertThatThrownBy(() -> userService.updateUser(user.getUserId(), userUpdateRequest))
//                 .isInstanceOf(UserNotFoundException.class).hasMessage("User not found");
//         verify(userRepository, never()).save(user);
//     }

//     @Test
//     void testUpdateUser_ThrowsException_WhenUsernameAlreadyExist() {
//         mock(UserRepository.class);
//         mock(UserUpdateDTO.class);
//         mock(User.class);
//         when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));
//         when(userRepository.findByUsername(userUpdateRequest.getUsername())).thenReturn(Optional.of(user));
//         Assertions.assertThatThrownBy(() -> userService.updateUser(user.getUserId(), userUpdateRequest))
//                 .isInstanceOf(UsernameAlreadyExistException.class).hasMessage("Username already exist");
//         verify(userRepository, never()).save(user);
//     }

//     @Test
//     void testGetUser_Success() {
//         mock(UserRepository.class);
//         mock(User.class);
//         when(userRepository.findById(user.getUserId())).thenReturn(Optional.ofNullable(user));
//         UserDetailsDTO existingUser = userService.getUser(user.getUserId());
//         Assertions.assertThat(existingUser.getUserId()).isEqualTo(user.getUserId());
//         Assertions.assertThat(existingUser.getUsername()).isEqualTo(user.getUsername());
//     }

//     @Test
//     void testGetUser_ThrowsException_WhenUserNotFound() {
//         mock(UserRepository.class);
//         mock(User.class);
//         when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());
//         Assertions.assertThatThrownBy(() -> userService.getUser(user.getUserId()))
//                 .isInstanceOf(UserNotFoundException.class).hasMessage("User not found");
//     }

//     @Test
//     void testGetAllUsers_Success() {
//         mock(UserRepository.class);
//         mock(User.class);
//         when(userRepository.findAll()).thenReturn(new ArrayList<User>(existingUsers));
//         List<UserDetailsDTO> userList = userService.getAllUsers();
//         Assertions.assertThat(userList).isNotEmpty();
//         Assertions.assertThat(userList.size()).isEqualTo(existingUsers.size());
//     }

//     @Test
//     void testGetAllUsers_ThrowsException_WhenNoUsersFound() {
//         mock(UserRepository.class);
//         mock(User.class);
//         when(userRepository.findAll()).thenReturn(null);
//         Assertions.assertThatThrownBy(() -> userService.getAllUsers()).isInstanceOf(NoUsersFoundException.class)
//                 .hasMessage("No users found");
//     }

//     @Test
//     void testDeleteUser_Success() {
//         mock(User.class);
//         mock(UserRepository.class, Mockito.CALLS_REAL_METHODS);
//         when(userRepository.findById(user.getUserId())).thenReturn(Optional.ofNullable(user));
//         doAnswer(Answers.CALLS_REAL_METHODS).when(userRepository).deleteById(any());
//         Assertions.assertThat(userService.deleteUser(user.getUserId())).isTrue();
//     }

//     @Test
//     void testDeleteUser_ThrowsException_WhenUserNotFound() {
//         mock(User.class);
//         mock(UserRepository.class);
//         when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());
//         Assertions.assertThatThrownBy(() -> userService.deleteUser(user.getUserId()))
//                 .isInstanceOf(UserNotFoundException.class).hasMessage("User not found");
//     }
// }
