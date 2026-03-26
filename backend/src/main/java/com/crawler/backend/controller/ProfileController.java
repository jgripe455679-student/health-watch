package com.crawler.backend.controller;

import java.net.URI;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
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
    public ResponseEntity<?> archiveProfile(
            @PathVariable Long profileId, Principal principal) {
        String username = principal.getName();
        String response = profileService.archiveProfile(profileId, username);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProfileDto>> searchByLastName(@RequestParam String lastName) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<ProfileDto> profiles = profileService.searchByLastName(lastName, sort);
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> findProfile(@RequestParam String lastName, @RequestParam String firstName,
            @RequestParam(required = false) String middleName, @RequestParam(required = false) String suffix,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirth) {
        ProfileDto response = profileService.findProfile(lastName, firstName, middleName != null ? middleName : "",
                suffix != null ? suffix : "", dateOfBirth);
        return ResponseEntity.ok(response);
    }

    // @GetMapping("/{lastName}/{firstName}/{dateOfBirth}")
    // public ResponseEntity<ProfileDto> findProfile(@PathVariable String lastName,
    // @PathVariable String firstName, @PathVariable LocalDate dateOfBirth) {
    // ProfileDto response = profileService.findProfile(lastName, firstName, "", "",
    // dateOfBirth);
    // return ResponseEntity.ok(response);
    // }

    // @GetMapping("/{lastName}/{firstName}/{middleName}/{dateOfBirth}")
    // public ResponseEntity<ProfileDto> findProfile(@PathVariable String lastName,
    // @PathVariable String firstName, @PathVariable String middleName,
    // @PathVariable LocalDate dateOfBirth) {
    // ProfileDto response = profileService.findProfile(lastName, firstName,
    // middleName, "", dateOfBirth);
    // return ResponseEntity.ok(response);
    // }

    // @GetMapping("/{lastName}/{firstName}/{middleName}/{suffix}/{dateOfBirth}")
    // public ResponseEntity<ProfileDto> findProfile(@PathVariable String lastName,
    // @PathVariable String firstName, @PathVariable String middleName,
    // @PathVariable String suffix,
    // @PathVariable LocalDate dateOfBirth) {
    // ProfileDto response = profileService.findProfile(lastName, firstName,
    // middleName, suffix, dateOfBirth);
    // return ResponseEntity.ok(response);
    // }

    @GetMapping("/count")
    public ResponseEntity<Long> getProfileCount() {
        return ResponseEntity.ok(profileService.getProfileCount());
    }

}
