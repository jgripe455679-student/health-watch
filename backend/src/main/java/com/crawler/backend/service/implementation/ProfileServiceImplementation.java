package com.crawler.backend.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.crawler.backend.dto.ProfileDto;
import com.crawler.backend.exception.AppException;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.mapper.ProfileMapper;
import com.crawler.backend.model.Profile;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.ProfileRepository;
import com.crawler.backend.repository.UserRepository;
import com.crawler.backend.service.ProfileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProfileServiceImplementation implements ProfileService {

        private final UserRepository userRepository;
        private final ProfileRepository profileRepository;

        @Override
        public ProfileDto create(ProfileDto profileDto) {
                Profile profile = ProfileMapper.profileDtoToProfile(profileDto);

                if (profileRepository.findProfile(profileDto.lastName(), profileDto.firstName(),
                                profileDto.middleName(), profileDto.suffix(), profileDto.dateOfBirth()).isPresent()) {
                        throw new AppException(HttpStatus.CONFLICT, "Profile already exist");
                }

                User user = userRepository.findByUsername(profileDto.createdBy()).orElseThrow(
                                () -> new ResourceNotFoundException("User not found"));

                profile.setCreatedBy(user);

                return ProfileMapper.profileToProfileDto(profileRepository.save(profile));
        }

        @Override
        public List<ProfileDto> getProfiles(Sort sort) {
                return profileRepository.findAll(sort).stream().map(ProfileMapper::profileToProfileDto)
                                .collect(Collectors.toList());
        }

        @Override
        public ProfileDto getProfile(Long profileId) {
                Profile profile = profileRepository.findById(profileId).orElseThrow(
                                () -> new ResourceNotFoundException("Profile not found"));
                return ProfileMapper.profileToProfileDto(profile);
        }

        @Override
        public ProfileDto updateProfile(Long profileId, ProfileDto profileDto) {
                Profile profile = profileRepository.findById(profileId).orElseThrow(
                                () -> new ResourceNotFoundException("Profile not found"));

                User updatedBy = userRepository.findByUsername(profileDto.updatedBy()).orElseThrow(
                                () -> new ResourceNotFoundException("User not found"));

                profile.setFirstName(profileDto.firstName());
                profile.setMiddleName(profileDto.middleName());
                profile.setLastName(profileDto.lastName());
                profile.setSuffix(profileDto.suffix());
                profile.setDateOfBirth(profileDto.dateOfBirth());
                profile.setAge(profileDto.age());
                profile.setGender(profileDto.gender());
                profile.setMaritalStatus(profileDto.maritalStatus());
                profile.setAddress(profileDto.address());
                profile.setEmailAddress(profileDto.emailAddress());
                profile.setMobileNumber(profileDto.mobileNumber());
                profile.setOccupation(profileDto.occupation());
                profile.setEducationalBackground(profileDto.educationalBackground());
                profile.setUpdatedBy(updatedBy);
                profile.setArchived(profileDto.isArchived());

                return ProfileMapper.profileToProfileDto(profileRepository.save(profile));
        }

        @Override
        public String archiveProfile(Long profileId, String username) {
                Profile profile = profileRepository.findById(profileId).orElseThrow(
                                () -> new ResourceNotFoundException("Profile not found"));

                User archivedBy = userRepository.findByUsername(username)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                profile.setArchived(true);
                profile.setUpdatedBy(archivedBy);

                profileRepository.save(profile);

                return String.format("Profile id %d archived successfully", profileId);
        }

        @Override
        public List<ProfileDto> searchByLastName(String lastName, Sort sort) {
                return profileRepository.findByLastNameContaining(lastName, sort).stream()
                                .map(ProfileMapper::profileToProfileDto)
                                .collect(Collectors.toList());
        }

        @Override
        public ProfileDto findProfile(String lastName, String firstName, String middleName, String suffix,
                        LocalDate dateOfBirth) {
                Profile profile = profileRepository
                                .findProfile(lastName, firstName, middleName, suffix, dateOfBirth).orElseThrow(
                                                () -> new ResourceNotFoundException("Profile not found"));
                return ProfileMapper.profileToProfileDto(profile);
        }

        @Override
        public Long getProfileCount() {
                return profileRepository.count();
        }

}
