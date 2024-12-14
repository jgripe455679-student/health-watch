package com.crawler.backend.service;

import java.util.List;

import com.crawler.backend.dto.ProfileDto;

public interface ProfileService {
    List<ProfileDto> getProfiles();

    ProfileDto create(ProfileDto profileDto);

    ProfileDto getProfile(Long profileId);

    ProfileDto updateProfile(Long profileId, ProfileDto profileDto);

    String deleteProfile(Long profileId);

    List<ProfileDto> searchByLastName(String lastName);
}
