package com.crawler.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.crawler.backend.dto.ProfileDto;

public interface ProfileService {
    List<ProfileDto> getProfiles(Sort sort);

    ProfileDto create(ProfileDto profileDto);

    ProfileDto getProfile(Long profileId);

    ProfileDto updateProfile(Long profileId, ProfileDto profileDto);

    String deleteProfile(Long profileId);

    List<ProfileDto> searchByLastName(String lastName, Sort sort);

    ProfileDto getProfileByFullName(String lastName, String firstName, String middleName, String suffix);
}
