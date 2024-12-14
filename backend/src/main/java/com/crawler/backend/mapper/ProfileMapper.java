package com.crawler.backend.mapper;

import com.crawler.backend.dto.ProfileDto;
import com.crawler.backend.model.Profile;

public class ProfileMapper {
    public static ProfileDto profileToProfileDto(Profile profile) {
        return new ProfileDto(
                profile.getId(),
                profile.getFirstName(),
                profile.getMiddleName(),
                profile.getLastName(),
                profile.getSuffix(),
                profile.getDateOfBirth(),
                profile.getGender(),
                profile.getMaritalStatus(),
                profile.getAddress(),
                profile.getMobileNumber(),
                profile.getOccupation(),
                profile.getEducationalBackground(),
                profile.getHouseholdSize(),
                profile.getIncomeBracket(),
                profile.getCreatedAt(),
                profile.getCreatedBy().getUsername(),
                profile.getUpdatedAt(),
                profile.getUpdatedBy() != null ? profile.getUpdatedBy().getUsername() : null);
    }

    public static Profile profileDtoToProfile(ProfileDto profileDto) {
        Profile profile = new Profile();
        profile.setFirstName(profileDto.firstName().toLowerCase());
        profile.setMiddleName(profileDto.middleName().toLowerCase());
        profile.setLastName(profileDto.lastName().toLowerCase());
        profile.setSuffix(profileDto.suffix());
        profile.setDateOfBirth(profileDto.dateOfBirth());
        profile.setGender(profileDto.gender());
        profile.setMaritalStatus(profileDto.maritalStatus());
        profile.setAddress(profileDto.address().toLowerCase());
        profile.setMobileNumber(profileDto.mobileNumber());
        profile.setOccupation(profileDto.occupation().toLowerCase());
        profile.setEducationalBackground(profileDto.educationalBackground());
        profile.setHouseholdSize(profileDto.householdSize());
        profile.setIncomeBracket(profileDto.incomeBracket());
        return profile;
    }
}
