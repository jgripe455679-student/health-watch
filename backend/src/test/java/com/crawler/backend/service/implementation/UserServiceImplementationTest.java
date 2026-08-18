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
import org.junit.jupiter.api.Nested;
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
        this.test_admin.setId(1L);
        this.test_admin.setUsername("test_admin");
        this.test_admin.setPassword("P@ssw0rd123");
        this.test_admin.setRole(this.roleAdmin);
        this.test_admin.setCreatedAt(LocalDateTime.now());
        this.test_admin.setUpdatedAt(LocalDateTime.now());

        this.test_user = new User();
        this.test_user.setId(2L);
        this.test_user.setUsername("test_user");
        this.test_user.setPassword("P@ssw0rd123");
        this.test_user.setRole(this.roleUser);
        this.test_user.setCreatedAt(LocalDateTime.now());

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

    @Nested
    class CreateUserTests {

        @Test
        void testCreateUser_throwsException_unauthorized() {
            mockLogin(null, false, null);
            Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Full authentication is required to access this resource");
            verify(userRepository, never()).save(any(User.class));
        }

        @Test
        void testCreateUser_throwsException_whenAuthenticatedUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(userRepository, never()).save(any(User.class));
        }

        @Test
        void testCreateUser_throwsException_forbidden() {
            mockLogin(test_user, true, true);
            when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
            Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Access is denied. You do not have the required permissions");
            verify(userRepository, never()).save(any(User.class));
        }

        @Test
        void testCreateUser_throwsException_whenUsernameAlreadyExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.of(test_user));
            Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                    .isInstanceOf(AppException.class).hasMessage("Username already exist");
            verify(userRepository, never()).save(any(User.class));
        }

        @Test
        void testCreateUser_throwsException_whenRoleDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.empty());
            when(roleRepository.findByName(anyString())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("Role not found");
            verify(userRepository, never()).save(any(User.class));
        }

        @Test
        void testCreateUser_throwsException_whenCreatedByDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            when(userRepository.findByUsername(test_user_dto.createdBy())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.create(test_user_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(userRepository, never()).save(any(User.class));
        }

        @Test
        void testCreateUser_success() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.empty());
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(roleRepository.findByName(Roles.USER.name())).thenReturn(Optional.of(roleUser));
            when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
            userServiceImplementation.create(test_user_dto);
            verify(userRepository).save(any(User.class));
        }

    }

    @Nested
    class GetUsersTests {
        @Test
        void testGetUsers_throwsException_unauthorized() {
            mockLogin(null, false, null);
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUsers(Sort.unsorted()))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Full authentication is required to access this resource");
            verify(userRepository, never()).findAll(any(Sort.class));
        }

        @Test
        void testGetUsers_throwsException_whenAuthenticatedUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUsers(Sort.unsorted()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
        }

        @Test
        void testGetUsers_throwsException_forbidden() {
            mockLogin(test_user, true, true);
            when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUsers(Sort.unsorted()))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Access is denied. You do not have the required permissions");
            verify(userRepository, never()).findAll(any(Sort.class));
        }

        @Test
        void testGetUsers_success() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findAll(Sort.unsorted())).thenReturn(List.of(test_user, test_admin));
            List<UserResponseDto> users = userServiceImplementation.getUsers(Sort.unsorted());
            Assertions.assertThat(users).isNotEmpty();
            Assertions.assertThat(users.size()).isEqualTo(2);
        }
    }

    @Nested
    class GetUserTests {

        @Test
        void testGetUser_throwsException_unauthorized() {
            mockLogin(null, false, null);
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUser(test_user.getId()))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Full authentication is required to access this resource");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testGetUser_throwsException_whenAuthenticatedUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUser(test_user.getId()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testGetUser_throwsException_forbidden() {
            mockLogin(test_user, true, true);
            when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUser(test_admin.getId()))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Access is denied. You do not have the required permissions");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testGetUser_throwsException_whenUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findById(test_user.getId())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUser(test_user.getId()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
        }

        @Test
        void testGetUser_success() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findById(test_user.getId())).thenReturn(Optional.of(test_user));
            UserResponseDto userResponse = userServiceImplementation.getUser(test_user.getId());
            Assertions.assertThat(userResponse).isNotNull();
            Assertions.assertThat(userResponse.username()).isEqualTo(test_user.getUsername());
        }
    }

    @Nested
    class UpdateUserTests {

        @Test
        void testUpdateUser_throwsException_unauthorized() {
            mockLogin(null, false, null);
            Assertions.assertThatThrownBy(() -> userServiceImplementation.updateUser(test_user.getId(), test_user_dto))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Full authentication is required to access this resource");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testUpdateUser_throwsException_whenAuthenticatedUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.updateUser(test_user.getId(), test_user_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testUpdateUser_throwsException_forbidden() {
            mockLogin(test_user, true, true);
            when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
            Assertions.assertThatThrownBy(() -> userServiceImplementation.updateUser(test_admin.getId(), test_user_dto))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Access is denied. You do not have the required permissions");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testUpdateUser_throwsException_whenUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findById(test_user.getId())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.updateUser(test_user.getId(), test_user_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
        }

        @Test
        void testUpdateUser_throwsException_whenUsernameAlreadyExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findById(test_user.getId())).thenReturn(Optional.of(test_user));
            when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.of(test_user));
            Assertions.assertThatThrownBy(() -> userServiceImplementation.updateUser(test_user.getId(), test_user_dto))
                    .isInstanceOf(AppException.class).hasMessage("Username already exist");
        }

        @Test
        void testUpdateUser_throwsException_whenRoleDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findById(test_user.getId())).thenReturn(Optional.of(test_user));
            when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.empty());
            when(roleRepository.findByName(test_user_dto.role())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.updateUser(test_user.getId(), test_user_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("Role not found");
        }

        @Test
        void testUpdateUser_throwsException_whenUpdatedByNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            when(userRepository.findByUsername(test_user_dto.updatedBy())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.updateUser(test_user.getId(), test_user_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
        }

        @Test
        void testUpdateUser_success() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findById(test_user.getId())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.updateUser(test_user.getId(), test_user_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
        }
    }

    @Nested
    class testDisableUserTests {

        @Test
        void testDisableUser_throwsException_unauthorized() {
            mockLogin(null, false, null);
            Assertions
                    .assertThatThrownBy(
                            () -> userServiceImplementation.disableUser(test_user.getId(),
                                    test_admin.getUsername()))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Full authentication is required to access this resource");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testDisableUser_throwsException_whenAuthenticatedUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            Assertions
                    .assertThatThrownBy(
                            () -> userServiceImplementation.disableUser(test_user.getId(),
                                    test_admin.getUsername()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testDisableUser_throwsException_forbidden() {
            mockLogin(test_user, true, true);
            when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
            Assertions
                    .assertThatThrownBy(
                            () -> userServiceImplementation.disableUser(test_admin.getId(),
                                    test_user.getUsername()))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Access is denied. You do not have the required permissions");
            verify(userRepository, never()).findById(any(Long.class));
        }

        @Test
        void testDisableUser_throwsException_whenUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findById(test_user.getId())).thenReturn(Optional.empty());
            Assertions
                    .assertThatThrownBy(
                            () -> userServiceImplementation.disableUser(test_user.getId(),
                                    test_admin.getUsername()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
        }

        @Test
        void testDisableUser_success() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findById(test_user.getId())).thenReturn(Optional.of(test_user));
            userServiceImplementation.disableUser(test_user.getId(), test_admin.getUsername());
            verify(userRepository).save(any(User.class));
        }
    }

    @Nested
    class testSearchByUsername {

        @Test
        void testSearchByUsername_throwsException_unauthorized() {
            mockLogin(null, false, null);
            Assertions.assertThatThrownBy(() -> userServiceImplementation.searchByUsername("test", Sort.unsorted()))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Full authentication is required to access this resource");
            verify(userRepository, never()).findByUsernameContaining(anyString(), any(Sort.class));
        }

        @Test
        void testSearchByUsername_throwsException_whenAuthenticatedUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.searchByUsername("test", Sort.unsorted()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(userRepository, never()).findByUsernameContaining(anyString(), any(Sort.class));
        }

        @Test
        void testSearchByUsername_throwsException_forbidden() {
            mockLogin(test_user, true, true);
            when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
            Assertions.assertThatThrownBy(() -> userServiceImplementation.searchByUsername("test", Sort.unsorted()))
                    .isInstanceOf(AppException.class)
                    .hasMessage("Access is denied. You do not have the required permissions");
            verify(userRepository, never()).findByUsernameContaining(anyString(), any(Sort.class));
        }

        @Test
        void testSearchByUsername_success() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.findByUsernameContaining("test", Sort.unsorted()))
                    .thenReturn(List.of(test_user, test_admin));
            List<UserResponseDto> users = userServiceImplementation.searchByUsername("test", Sort.unsorted());
            Assertions.assertThat(users).isNotEmpty();
            Assertions.assertThat(users.size()).isEqualTo(2);
        }
    }

    @Nested
    class testGetUserCount {

        @Test
        void testgetUserCount_throwsException_unauthorized() {
            mockLogin(null, false, null);
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUserCount())
                    .isInstanceOf(AppException.class)
                    .hasMessage("Full authentication is required to access this resource");
            verify(userRepository, never()).count();
        }

        @Test
        void testGetUserCount_throwsException_whenAuthenticatedUserDoesNotExist() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUserCount())
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(userRepository, never()).count();
        }

        @Test
        void testGetUserCount_throwsException_forbidden() {
            mockLogin(test_user, true, true);
            when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUserCount())
                    .isInstanceOf(AppException.class)
                    .hasMessage("Access is denied. You do not have the required permissions");
            verify(userRepository, never()).count();
        }

        @Test
        void testGetUserCount_success() {
            mockLogin(test_admin, true, true);
            when(userRepository.findByUsername(test_admin.getUsername())).thenReturn(Optional.of(test_admin));
            when(userRepository.count()).thenReturn(2L);
            Long userCount = userServiceImplementation.getUserCount();
            Assertions.assertThat(userCount).isEqualTo(2L);
        }
    }

    @Nested
    class testGetUserByUsername {

        @Test
        void testGetUserByUsername_throwsException_whenUserDoesNotExist() {
            when(userRepository.findByUsername(test_user_dto.username())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> userServiceImplementation.getUserByUsername(test_user_dto.username()))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessage("User not found");
            verify(userRepository, never()).count();
        }

        @Test
        void testGetUserByUsername_success() {
            when(userRepository.findByUsername(test_user.getUsername())).thenReturn(Optional.of(test_user));
            UserResponseDto userResponse = userServiceImplementation.getUserByUsername(test_user.getUsername());
            Assertions.assertThat(userResponse).isNotNull();
            Assertions.assertThat(userResponse.username()).isEqualTo(test_user.getUsername());
        }
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