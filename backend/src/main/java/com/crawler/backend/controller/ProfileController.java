package com.crawler.backend.controller;

import java.net.URI;
import java.util.List;

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
        return ResponseEntity.ok(profileService.getProfiles());
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
        List<ProfileDto> profiles = profileService.searchByLastName(lastName);
        return ResponseEntity.ok(profiles);
    }
}
