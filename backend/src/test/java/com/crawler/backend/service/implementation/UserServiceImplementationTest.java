package com.crawler.backend.service.implementation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.crawler.backend.dto.UserDto;
import com.crawler.backend.dto.UserResponseDto;
import com.crawler.backend.enums.Roles;
import com.crawler.backend.exception.AppException;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.RoleRepository;
import com.crawler.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplementationTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private UserServiceImplementation userServiceImplementation;

    private AutoCloseable autoCloseable;
    private UserDto test_user_dto;
    private User test_user;
    private User test_user1;
    private User test_admin;
    private Role roleAdmin;
    private Role roleUser;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);

        userServiceImplementation = new UserServiceImplementation(userRepository, roleRepository, passwordEncoder);

        this.roleAdmin = Role.builder()
                .id(1L)
                .name(Roles.ADMIN.name())
                .build();

        this.roleUser = Role.builder()
                .id(2L)
                .name(Roles.USER.name())
                .build();

        this.test_admin = new User();
        this.test_admin.setUsername("test_admin");
        this.test_admin.setPassword("P@ssw0rd123");
        this.test_admin.setRole(this.roleAdmin);
        this.test_admin.setCreatedAt(LocalDateTime.now());
        this.test_admin.setUpdatedAt(LocalDateTime.now());

        this.test_user = new User();
        this.test_user.setUsername("test_user");
        this.test_user.setPassword("P@ssw0rd123");
        this.test_user.setRole(this.roleUser);
        this.test_user.setCreatedAt(LocalDateTime.now());

        this.test_user1 = new User();
        this.test_user1.setUsername("test_user_1");
        this.test_user1.setPassword("P@ssw0rd123");
        this.test_user1.setRole(this.roleUser);
        this.test_user1.setCreatedAt(LocalDateTime.now());

        this.test_user_dto = new UserDto("test_user_dto", "P@ssw0rd123", roleUser.getName(), "test_admin",
                "test_admin");

    }

    private void mockLogin(User user, boolean isAuthenticated, Boolean val) {
        Authentication mockAuthentication = mock(Authentication.class);
        SecurityContext mockSecurityContext = mock(SecurityContext.class);

        if (user != null) {
            when(mockAuthentication.getName()).thenReturn(user.getUsername());
        }

        if (isAuthenticated) {
            when(mockAuthentication.isAuthenticated()).thenReturn(val);
        }
        when(mockSecurityContext.getAuthentication()).thenReturn(mockAuthentication);

        SecurityContextHolder.setContext(mockSecurityContext);
    }

    @AfterEach
    void tearDown() throws Exception {
        this.autoCloseable.close();
        SecurityContextHolder.clearContext();
    }

    @Test
    void testCreateUser_Success() {
        mockLogin(test_admin, false, null);
        when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
        when(roleRepository.findByName(Roles.USER.name())).thenReturn(Optional.of(roleUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        userServiceImplementation.create(test_user_dto);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testCreateUser_ThrowsException_Forbidden() {
        mockLogin(test_admin, false, null);
        when(roleRepository.findByName(Roles.USER.name())).thenReturn(Optional.of(roleUser));
        when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(test_user_dto.createdBy())).thenReturn(Optional.of(test_user));
        Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                .isInstanceOf(AppException.class)
                .hasMessage("Access is denied. You do not have the required permissions");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testGetUsers_Success() {
        mockLogin(test_admin, true, true);
        when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
        when(userRepository.findAll(Sort.unsorted())).thenReturn(List.of(test_user, test_user1));
        List<UserResponseDto> users = userServiceImplementation.getUsers(Sort.unsorted());
        Assertions.assertThat(users).isNotEmpty();
        Assertions.assertThat(users.size()).isEqualTo(2);
    }

    @Test
    void testCreateUser_ThrowsException_WhenUsernameAlreadyExist() {
        when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.of(test_user));
        Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                .isInstanceOf(AppException.class).hasMessage("Username already exist");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testCreateUser_ThrowsException_WhenRoleDoesNotExist() {
        when(roleRepository.findByName(anyString())).thenReturn(Optional.empty());
        Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                .isInstanceOf(ResourceNotFoundException.class).hasMessage("Role not found");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testCreateUser_ThrowsException_WhenUserDoesNotExist() {
        when(roleRepository.findByName(Roles.USER.name())).thenReturn(Optional.of(roleUser));
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testCreateUser_ThrowsException_Unauthorized() {
        mockLogin(test_user, false, null);
        when(roleRepository.findByName(Roles.USER.name())).thenReturn(Optional.of(roleUser));
        when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(test_user_dto.createdBy())).thenReturn(Optional.of(test_admin));
        Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                .isInstanceOf(AppException.class)
                .hasMessage("Full authentication is required to access this resource");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testGetUsers_ThrowsException_Unauthorized() {
        mockLogin(null, false, null);
        Assertions.assertThatThrownBy(() -> userServiceImplementation.getUsers(Sort.unsorted()))
                .isInstanceOf(AppException.class).hasMessage("Full authentication is required to access this resource");
        verify(userRepository, never()).findAll(any(Sort.class));
    }

    @Test
    void testGetUsers_ThrowsException_Forbidden() {
        mockLogin(test_user, true, true);
        when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
        Assertions.assertThatThrownBy(() -> userServiceImplementation.getUsers(Sort.unsorted()))
                .isInstanceOf(AppException.class)
                .hasMessage("Access is denied. You do not have the required permissions");
        verify(userRepository, never()).findAll(any(Sort.class));
    }

}                               

// package com.crawler.backend.service.implementation;

// import static org.mockito.Mockito.mock;
// import static org.mockito.Mockito.verify;
// import static org.mockito.Mockito.when;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.ArgumentMatchers.anyString;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.Collection;
// import java.util.Optional;

// import org.junit.jupiter.api.AfterEach;
// import org.junit.jupiter.api.BeforeAll;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import com.crawler.backend.dto.UserDto;
// import com.crawler.backend.dto.UserRequestDto;
// import com.crawler.backend.enums.Roles;
// import com.crawler.backend.model.Role;
// import com.crawler.backend.model.User;
// import com.crawler.backend.repository.RoleRepository;
// import com.crawler.backend.repository.UserRepository;

// @ExtendWith(MockitoExtension.class)
// public class UserServiceImplementationTest {
// @Mock
// private UserRepository userRepository;

// @Mock
// private RoleRepository roleRepository;

// @Mock
// private PasswordEncoder passwordEncoder;

// private UserServiceImplementation userServiceImplementation;

// private AutoCloseable autoCloseable;
// private User creator;
// private UserDto userDto;
// private UserRequestDto userRequestDto;
// private Collection<UserDto> existingUsers;

// @BeforeEach
// void setUp() {
// // Initialize Mockito mocks
// autoCloseable = MockitoAnnotations.openMocks(this);
// existingUsers = new ArrayList<>();

// // Instantiate real Java objects to act as the mock data
// Role roleAdmin = Role.builder()
// .id(1L)
// .name(Roles.ADMIN.name())
// .build();
// Role roleUser = Role.builder()
// .id(0L)
// .name(Roles.USER.name())
// .build();

// creator = User.builder()
// .id(1L)
// .username("creator_dummy")
// .password(passwordEncoder.encode("P@ssw0rd123"))
// .role(roleAdmin)
// .build();

// // STUB the MOCKS
// when(roleRepository.findByName(Roles.ADMIN.name())).thenReturn(Optional.of(roleUser));

// when(userRepository.findByUsername("creator_dummy")).thenReturn(Optional.of(creator));

// // Initialize UserServiceImplementation
// userServiceImplementation = new UserServiceImplementation(userRepository,
// roleRepository, passwordEncoder);

// // Populate DTO collections
// creator = userRepository.findByUsername("creator_dummy").get();
// userDto = new UserDto("first_dummy", "P@ssw0rd123", Roles.USER.name(),
// creator.getUsername(), "first_dummy");
// userRequestDto = new UserRequestDto();
// userRequestDto.setUsername("second_dummy");
// userRequestDto.setPassword("P@ssw0rd123");
// userRequestDto.setConfirmPassword("P@ssw0rd123");
// userRequestDto.setRole(roleUser.getName());
// userRequestDto.setCreatedBy(creator.getUsername());
// userRequestDto.setUpdatedBy("second_dummy");
// UserDto test = new UserDto("first_dummy", "P@ssw0rd123", Roles.USER.name(),
// creator.getUsername(),
// "first_dummy");
// UserDto test1 = new UserDto("second_dummy", "P@ssw0rd123", Roles.USER.name(),
// creator.getUsername(),
// "second_dummy");
// existingUsers.add(test);
// existingUsers.add(test1);
// }

// @AfterEach
// void tearDown() throws Exception {
// autoCloseable.close();
// }

// @Test
// void testCreateUser_Success() {
// mock(User.class);
// mock(UserRepository.class);
// when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
// userServiceImplementation.create(userDto);
// verify(userRepository).save(any(User.class));
// }

// }

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
// @Mock
// private UserRepository userRepository;
// @InjectMocks
// private UserServiceImplementation userService;
// AutoCloseable autoCloseable;
// User user;
// UserUpdateDTO userUpdateRequest;
// Collection<User> existingUsers;

// @BeforeEach
// void setUp() {
// autoCloseable = MockitoAnnotations.openMocks(this);
// userService = new UserServiceImplementation(userRepository);
// user = new User("test", "test");
// user.setUserDateCreated(LocalDateTime.now());
// userUpdateRequest = new UserUpdateDTO("test1", "test", "test", true);
// existingUsers = new ArrayList<>();
// existingUsers.add(new User("test", "test"));
// existingUsers.add(new User("test1", "test1"));
// }

// @AfterEach
// void tearDown() throws Exception {
// autoCloseable.close();
// }

// @Test
// void testCreateUser_Success() {
// mock(User.class);
// mock(UserRepository.class);
// when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.empty());
// userService.createUser(user);
// verify(userRepository).save(user);
// }

// @Test
// void testCreateUser_ThrowsException_WhenUsernameAlreadyExist() {
// mock(User.class);
// mock(UserRepository.class);
// when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
// Assertions.assertThatThrownBy(() -> userService.createUser(user))
// .isInstanceOf(UsernameAlreadyExistException.class).hasMessage("Username
// already exist");
// verify(userRepository, never()).save(user);
// }

// @Test
// void testUpdateUser_Success() {
// mock(UserRepository.class);
// mock(UserUpdateDTO.class);
// mock(User.class);
// when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));
// when(userRepository.findByUsername(userUpdateRequest.getUsername())).thenReturn(Optional.empty());
// userService.updateUser(user.getUserId(), userUpdateRequest);
// verify(userRepository).save(user);
// }

// @Test
// void testUpdateUser_ThrowsException_WhenUserNotFound() {
// mock(UserRepository.class);
// mock(UserUpdateDTO.class);
// mock(User.class);
// when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());
// Assertions.assertThatThrownBy(() -> userService.updateUser(user.getUserId(),
// userUpdateRequest))
// .isInstanceOf(UserNotFoundException.class).hasMessage("User not found");
// verify(userRepository, never()).save(user);
// }

// @Test
// void testUpdateUser_ThrowsException_WhenUsernameAlreadyExist() {
// mock(UserRepository.class);
// mock(UserUpdateDTO.class);
// mock(User.class);
// when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));
// when(userRepository.findByUsername(userUpdateRequest.getUsername())).thenReturn(Optional.of(user));
// Assertions.assertThatThrownBy(() -> userService.updateUser(user.getUserId(),
// userUpdateRequest))
// .isInstanceOf(UsernameAlreadyExistException.class).hasMessage("Username
// already exist");
// verify(userRepository, never()).save(user);
// }

// @Test
// void testGetUser_Success() {
// mock(UserRepository.class);
// mock(User.class);
// when(userRepository.findById(user.getUserId())).thenReturn(Optional.ofNullable(user));
// UserDetailsDTO existingUser = userService.getUser(user.getUserId());
// Assertions.assertThat(existingUser.getUserId()).isEqualTo(user.getUserId());
// Assertions.assertThat(existingUser.getUsername()).isEqualTo(user.getUsername());
// }

// @Test
// void testGetUser_ThrowsException_WhenUserNotFound() {
// mock(UserRepository.class);
// mock(User.class);
// when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());
// Assertions.assertThatThrownBy(() -> userService.getUser(user.getUserId()))
// .isInstanceOf(UserNotFoundException.class).hasMessage("User not found");
// }

// @Test
// void testGetAllUsers_Success() {
// mock(UserRepository.class);
// mock(User.class);
// when(userRepository.findAll()).thenReturn(new
// ArrayList<User>(existingUsers));
// List<UserDetailsDTO> userList = userService.getAllUsers();
// Assertions.assertThat(userList).isNotEmpty();
// Assertions.assertThat(userList.size()).isEqualTo(existingUsers.size());
// }

// @Test
// void testGetAllUsers_ThrowsException_WhenNoUsersFound() {
// mock(UserRepository.class);
// mock(User.class);
// when(userRepository.findAll()).thenReturn(null);
// Assertions.assertThatThrownBy(() ->
// userService.getAllUsers()).isInstanceOf(NoUsersFoundException.class)
// .hasMessage("No users found");
// }

// @Test
// void testDeleteUser_Success() {
// mock(User.class);
// mock(UserRepository.class, Mockito.CALLS_REAL_METHODS);
// when(userRepository.findById(user.getUserId())).thenReturn(Optional.ofNullable(user));
// doAnswer(Answers.CALLS_REAL_METHODS).when(userRepository).deleteById(any());
// Assertions.assertThat(userService.deleteUser(user.getUserId())).isTrue();
// }

// @Test
// void testDeleteUser_ThrowsException_WhenUserNotFound() {
// mock(User.class);
// mock(UserRepository.class);
// when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());
// Assertions.assertThatThrownBy(() -> userService.deleteUser(user.getUserId()))
// .isInstanceOf(UserNotFoundException.class).hasMessage("User not found");
// }
// }