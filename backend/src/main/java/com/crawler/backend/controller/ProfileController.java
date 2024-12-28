package com.crawler.backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crawler.backend.dto.ProfileDto;
import com.crawler.backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<ProfileDto> createProfile(@Validated @RequestBody ProfileDto profileDto) {
        ProfileDto response = profileService.create(profileDto);
        return ResponseEntity.created(URI.create("/api/v1/profiles" + response.id())).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProfileDto>> getProfiles() {
        return ResponseEntity.ok(profileService.getProfiles(Sort.by(Sort.Direction.DESC, "createdAt")));
    }

    @GetMapping("/{profileId}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable Long profileId) {
        ProfileDto response = profileService.getProfile(profileId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{profileId}")
    public ResponseEntity<ProfileDto> updateProfile(
            @PathVariable Long profileId,
            @Validated @RequestBody ProfileDto profileDto) {
        ProfileDto response = profileService.updateProfile(profileId, profileDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{profileId}")
    public ResponseEntity<?> deleteProfile(
            @PathVariable Long profileId) {
        String response = profileService.deleteProfile(profileId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProfileDto>> searchByLastName(@RequestParam String lastName) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<ProfileDto> profiles = profileService.searchByLastName(lastName, sort);
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/{lastName}/{firstName}")
    public ResponseEntity<ProfileDto> getProfileByFullName(@PathVariable String lastName,
            @PathVariable String firstName) {
        ProfileDto response = profileService.getProfileByFullName(lastName, firstName, "", "");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{lastName}/{firstName}/{middleName}")
    public ResponseEntity<ProfileDto> getProfileByFullName(@PathVariable String lastName,
            @PathVariable String firstName, @PathVariable String middleName) {
        ProfileDto response = profileService.getProfileByFullName(lastName, firstName, middleName, "");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{lastName}/{firstName}/{middleName}/{suffix}")
    public ResponseEntity<ProfileDto> getProfileByFullName(@PathVariable String lastName,
            @PathVariable String firstName, @PathVariable String middleName, @PathVariable String suffix) {
        ProfileDto response = profileService.getProfileByFullName(lastName, firstName, middleName, suffix);
        return ResponseEntity.ok(response);
    }
}
