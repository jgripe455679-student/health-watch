package com.crawler.backend.mapper;

import java.util.stream.Collectors;

import com.crawler.backend.dto.ProfileDto;
import com.crawler.backend.model.Profile;
import com.crawler.backend.model.Record;

public class ProfileMapper {
    public static ProfileDto profileToProfileDto(Profile profile) {
        return new ProfileDto(
                profile.getId(),
                profile.getFirstName(),
                profile.getMiddleName(),
                profile.getLastName(),
                profile.getSuffix(),
                profile.getDateOfBirth(),
                profile.getAge(),
                profile.getGender(),
                profile.getMaritalStatus(),
                profile.getAddress(),
                profile.getEmailAddress(),
                profile.getMobileNumber(),
                profile.getOccupation(),
                profile.getEducationalBackground(),
                profile.getRecords() != null
                        ? profile.getRecords().stream().map(Record::getRecordDate).collect(Collectors.toSet())
                        : null,
                profile.getCreatedAt(),
                profile.getCreatedBy().getUsername(),
                profile.getUpdatedAt(),
                profile.getUpdatedBy() != null ? profile.getUpdatedBy().getUsername() : null, profile.isArchived());
    }

    public static Profile profileDtoToProfile(ProfileDto profileDto) {
        Profile profile = new Profile();
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
        return profile;
    }
}
