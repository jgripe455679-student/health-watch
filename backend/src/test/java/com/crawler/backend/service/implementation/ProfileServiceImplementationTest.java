package com.crawler.backend.service.implementation;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
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

import com.crawler.backend.dto.ProfileDto;
import com.crawler.backend.enums.Roles;
import com.crawler.backend.exception.AppException;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.model.Profile;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.ProfileRepository;
import com.crawler.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class ProfileServiceImplementationTest {
    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private UserRepository userRepository;

    private ProfileServiceImplementation profileServiceImplementation;

    private AutoCloseable autoCloseable;
    private ProfileDto test_profile_dto;
    private Profile test_profile;
    private User test_admin;
    private Role roleAdmin;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);

        profileServiceImplementation = new ProfileServiceImplementation(userRepository, profileRepository);

        this.roleAdmin = Role.builder()
                .id(1L)
                .name(Roles.ADMIN.name())
                .build();

        this.test_admin = new User();
        this.test_admin.setId(1L);
        this.test_admin.setUsername("test_admin");
        this.test_admin.setPassword("P@ssw0rd123");
        this.test_admin.setRole(roleAdmin);
        this.test_admin.setCreatedAt(LocalDateTime.now());

        this.test_profile = new Profile();
        test_profile.setId(1L);
        test_profile.setFirstName("John");
        test_profile.setLastName("Green");
        test_profile.setDateOfBirth(LocalDate.parse("1998-01-01", FORMATTER));
        test_profile.setAge((short) 28);
        test_profile.setGender("Male");
        test_profile.setMaritalStatus("Single");
        test_profile.setAddress("1487 NOSTRAND AVE., BROOKLYN, NY");
        test_profile.setEmailAddress("jgreen@commercial.com");
        test_profile.setMobileNumber("09193753942");
        test_profile.setCreatedAt(LocalDateTime.now());
        test_profile.setCreatedBy(test_admin);
        test_profile.setUpdatedAt(LocalDateTime.now());
        test_profile.setUpdatedBy(test_admin);

        this.test_profile_dto = new ProfileDto(1L, "John", null, "Green", null,
                LocalDate.parse("1998-01-01", FORMATTER), (short) 28, "Male", "Single",
                "1487 NOSTRAND AVE., BROOKLYN, NY", "jgreen@commercial.com", "09193753942", null, null, null,
                LocalDateTime.now(), "test_admin", LocalDateTime.now(), "test_admin", false);
    }

    @AfterEach
    void tearDown() throws Exception {
        this.autoCloseable.close();
    }

    @Nested
    class CreateProfileTests {
        @Test
        void testCreateProfile_throwsException_whenProfileAlreadyExist() {
            when(profileRepository.findProfile(test_profile_dto.lastName(), test_profile_dto.firstName(), null, null,
                    test_profile_dto.dateOfBirth())).thenReturn(Optional.of(test_profile));
            Assertions.assertThatThrownBy(() -> profileServiceImplementation.create(test_profile_dto))
                    .isInstanceOf(AppException.class).hasMessage("Profile already exist");
            verify(profileRepository, never()).save(any(Profile.class));
        }

        @Test
        void testCreateProfile_throwsException_whenCreatedByDoesNotExist() {
            when(profileRepository.findProfile(test_profile_dto.lastName(), test_profile_dto.firstName(), null, null,
                    test_profile_dto.dateOfBirth())).thenReturn(Optional.empty());
            when(userRepository.findByUsername(test_profile_dto.createdBy())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> profileServiceImplementation.create(test_profile_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(profileRepository, never()).save(any(Profile.class));
        }

        @Test
        void testCreateProfile_success() {
            when(profileRepository.findProfile(test_profile_dto.lastName(), test_profile_dto.firstName(), null, null,
                    test_profile_dto.dateOfBirth())).thenReturn(Optional.empty());
            when(userRepository.findByUsername(test_profile_dto.createdBy())).thenReturn(Optional.of(test_admin));
            when(profileRepository.save(any(Profile.class))).thenAnswer(invocation -> invocation.getArgument(0));
            profileServiceImplementation.create(test_profile_dto);
            verify(profileRepository).save(any(Profile.class));
        }
    }

    @Nested
    class GetProfilesTest {
        @Test
        void testGetProfiles_success() {
            when(profileRepository.findAll(Sort.unsorted())).thenReturn(List.of(test_profile));
            List<ProfileDto> profiles = profileServiceImplementation.getProfiles(Sort.unsorted());
            Assertions.assertThat(profiles).isNotEmpty();
            Assertions.assertThat(profiles.size()).isEqualTo(1);
        }

        @Test
        void testGetProfiles_returnsEmptyList() {
            when(profileRepository.findAll(Sort.unsorted())).thenReturn(Collections.emptyList());
            List<ProfileDto> profiles = profileServiceImplementation.getProfiles(Sort.unsorted());
            Assertions.assertThat(profiles).isEmpty();
            Assertions.assertThat(profiles.size()).isEqualTo(0);
        }
    }

    @Nested
    class GetProfileTests {
        @Test
        void testGetProfile_throwsException_whenProfileDoesNotExist() {
            when(profileRepository.findById(test_profile_dto.id())).thenReturn(Optional.empty());
            Assertions.assertThatThrownBy(() -> profileServiceImplementation.getProfile(test_profile_dto.id()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("Profile not found");
        }

        @Test
        void testGetProfile_success() {
            when(profileRepository.findById(test_profile_dto.id())).thenReturn(Optional.of(test_profile));
            ProfileDto profileDto = profileServiceImplementation.getProfile(test_profile_dto.id());
            Assertions.assertThat((profileDto)).isNotNull();
            Assertions.assertThat(profileDto.id()).isEqualTo(test_profile_dto.id());
        }
    }

    @Nested
    class UpdateProfileTests {
        @Test
        void testUpdateProfile_throwsException_whenProfileDoesNotExist() {
            when(profileRepository.findById(test_profile_dto.id())).thenReturn(Optional.empty());
            Assertions
                    .assertThatThrownBy(
                            () -> profileServiceImplementation.updateProfile(test_profile_dto.id(), test_profile_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("Profile not found");
            verify(profileRepository, never()).save(any(Profile.class));
        }

        @Test
        void testUpdateProfile_throwsException_whenUpdatedByDoesNotExist() {
            when(profileRepository.findById(test_profile_dto.id())).thenReturn(Optional.of(test_profile));
            when(userRepository.findByUsername(test_profile_dto.createdBy())).thenReturn(Optional.empty());
            Assertions
                    .assertThatThrownBy(
                            () -> profileServiceImplementation.updateProfile(test_profile_dto.id(), test_profile_dto))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
            verify(profileRepository, never()).save(any(Profile.class));
        }

        @Test
        void testUpdateProfile_success() {
            when(profileRepository.findById(test_profile.getId())).thenReturn(Optional.of(test_profile));
            when(userRepository.findByUsername(test_profile_dto.createdBy())).thenReturn(Optional.of(test_admin));
            when(profileRepository.save(any(Profile.class))).thenAnswer(invocation -> invocation.getArgument(0));
            profileServiceImplementation.updateProfile(test_profile.getId(), test_profile_dto);
            verify(profileRepository).save(any(Profile.class));
        }
    }

    @Nested
    class ArchiveProfileTests {
        @Test
        void testArchiveProfile_throwsException_whenProfileDoesNotExist() {
            when(profileRepository.findById(test_profile_dto.id())).thenReturn(Optional.empty());
            Assertions
                    .assertThatThrownBy(
                            () -> profileServiceImplementation.archiveProfile(test_profile_dto.id(),
                                    test_profile_dto.updatedBy()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("Profile not found");
        }

        @Test
        void testArchiveProfile_throwsException_whenUpdatedByDoesNotExist() {
            when(profileRepository.findById(test_profile.getId())).thenReturn(Optional.of(test_profile));
            when(userRepository.findByUsername(test_profile.getUpdatedBy().getUsername()))
                    .thenReturn(Optional.empty());
            Assertions
                    .assertThatThrownBy(() -> profileServiceImplementation.archiveProfile(test_profile.getId(),
                            test_profile.getUpdatedBy().getUsername()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("User not found");
        }

        @Test
        void testArchiveProfile_success() {
            when(profileRepository.findById(test_profile.getId())).thenReturn(Optional.of(test_profile));
            when(userRepository.findByUsername(test_profile.getUpdatedBy().getUsername()))
                    .thenReturn(Optional.of(test_admin));
            profileServiceImplementation.archiveProfile(test_profile.getId(),
                    test_profile.getUpdatedBy().getUsername());
            verify(profileRepository).save(any(Profile.class));
        }
    }

    @Test
    void testSearchByLastName_success() {
        when(profileRepository.findByLastNameContaining(test_profile.getLastName(), Sort.unsorted()))
                .thenReturn(List.of(test_profile));
        List<ProfileDto> profiles = profileServiceImplementation.searchByLastName(test_profile.getLastName(),
                Sort.unsorted());
        Assertions.assertThat(profiles).isNotEmpty();
        Assertions.assertThat(profiles).isNotNull();
        Assertions.assertThat(profiles.size()).isEqualTo(1);
    }

    @Nested
    class FindProfileTests {
        @Test
        void testFindProfile_throwsException_whenProfileNotFound() {
            when(profileRepository.findProfile(test_profile_dto.lastName(), test_profile_dto.firstName(), null, null,
                    test_profile_dto.dateOfBirth())).thenReturn(Optional.empty());
            Assertions
                    .assertThatThrownBy(() -> profileServiceImplementation.findProfile(test_profile_dto.lastName(),
                            test_profile_dto.firstName(), null, null, test_profile_dto.dateOfBirth()))
                    .isInstanceOf(ResourceNotFoundException.class).hasMessage("Profile not found");
        }

        @Test
        void testFindProfile_success() {
            when(profileRepository.findProfile(test_profile.getLastName(), test_profile.getFirstName(), null, null,
                    test_profile.getDateOfBirth())).thenReturn(Optional.of(test_profile));
            ProfileDto profileDto = profileServiceImplementation.findProfile(test_profile.getLastName(),
                    test_profile.getFirstName(), null, null, test_profile.getDateOfBirth());
            Assertions.assertThat(profileDto).isNotNull();
            Assertions.assertThat(profileDto.id()).isEqualTo(test_profile.getId());
        }
    }

    @Test
    void testGetProfileCount() {
        when(profileRepository.count()).thenReturn(1L);
        Long profileCount = profileServiceImplementation.getProfileCount();
        Assertions.assertThat(profileCount).isEqualTo(1L);
    }
}