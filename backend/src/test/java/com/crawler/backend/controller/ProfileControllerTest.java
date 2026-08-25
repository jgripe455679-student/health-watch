package com.crawler.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.crawler.backend.dto.ProfileDto;
import com.crawler.backend.exception.AppExceptionHandler;
import com.crawler.backend.service.ProfileService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ActiveProfiles("test")
@WebMvcTest(ProfileController.class)
@AutoConfigureMockMvc(addFilters = false)
@ContextConfiguration(classes = ProfileController.class)
@Import(AppExceptionHandler.class)
class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    ProfileService profileService;

    private ProfileDto profileDto;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @BeforeEach
    void setUp() {
        profileDto = new ProfileDto(1L, "John", null, "Green", null,
                LocalDate.parse("1998-01-01", FORMATTER), (short) 28, "Male", "Single",
                "1487 NOSTRAND AVE., BROOKLYN, NY", "jgreen@commercial.com", "09193753942", null, null, null,
                LocalDateTime.now(), "test_admin", LocalDateTime.now(), "test_admin", false);
    }

    @Test
    void createProfile_shouldReturn201CreatedProfileDto() throws Exception {
        when(profileService.create(any(ProfileDto.class))).thenReturn(profileDto);
        mockMvc.perform(post("/api/v1/profiles").contentType("application/json")
                .content(objectMapper.writeValueAsString(profileDto))).andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/v1/profiles/" + profileDto.id()))
                .andExpect(jsonPath("$.id").value(profileDto.id()));

        verify(profileService).create(any(ProfileDto.class));
    }

    @Test
    void getProfiles_shouldReturnListOfProfileDto() throws Exception {
        when(profileService.getProfiles(any(Sort.class))).thenReturn(List.of(profileDto));
        mockMvc.perform(get("/api/v1/profiles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(profileDto.id()));

        verify(profileService).getProfiles(any(Sort.class));
    }

    @Test
    void getProfile_shouldReturnProfileDtoById() throws Exception {
        when(profileService.getProfile(1L)).thenReturn(profileDto);
        mockMvc.perform(get("/api/v1/profiles/{profileId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(profileDto.id()));

        verify(profileService).getProfile(1L);
    }

    @Test
    void updateProfile_shoudlReturnUpdatedProfileDto() throws Exception {
        ProfileDto testUpdateProfileDto = new ProfileDto(1L, "John", null, "Green", null,
                LocalDate.parse("1998-01-01", FORMATTER), (short) 28, "Male", "Single",
                "1487 NOSTRAND AVE., BROOKLYN, NY", "jgreen@commercial.com", "09193753942", null, null, null,
                LocalDateTime.now(), "test_admin", LocalDateTime.now(), "test_admin", true);

        when(profileService.updateProfile(any(Long.class), any(ProfileDto.class))).thenReturn(profileDto);

        mockMvc.perform(put("/api/v1/profiles/{profileId}", 1L)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(testUpdateProfileDto))).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(profileDto.id()));

        verify(profileService).updateProfile(eq(1L), any(ProfileDto.class));
    }

    @Test
    void archiveProfile_shoudReturnSuccessMessage() throws Exception {
        String username = "admin";
        String expectedResponse = "Profile archived successfully";

        Principal principal = () -> username;

        when(profileService.archiveProfile(1L, username)).thenReturn(expectedResponse);

        mockMvc.perform(delete("/api/v1/profiles/{profileId}", 1L)
                .principal(principal))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(expectedResponse));

        verify(profileService).archiveProfile(1L, username);
    }

    @Test
    void searchByLastName_shouldReturnListOfMatches() throws Exception {
        String lastName = "Green";
        when(profileService.searchByLastName(eq(lastName), any(Sort.class))).thenReturn(List.of(profileDto));
        mockMvc.perform(get("/api/v1/profiles/search").param("lastName", lastName)).andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(profileDto.id()))
                .andExpect(jsonPath("$[0].lastName").value(profileDto.lastName()));

        verify(profileService).searchByLastName(eq(lastName), any(Sort.class));
    }

    @Test
    void getProfileByProfile_shouldReturnProfileDto() throws Exception {
        String lastName = "Green";
        String firstName = "John";
        LocalDate dateOfBirth = LocalDate.parse("1998-01-01", FORMATTER);
        when(profileService.findProfile(lastName, firstName, "", "", dateOfBirth)).thenReturn(profileDto);
        mockMvc.perform(get("/api/v1/profiles/profile").param("lastName", lastName)
                .param("firstName", firstName)
                .param("middleName", "")
                .param("suffix", "")
                .param("dateOfBirth", "1998-01-01")).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(profileDto.id()))
                .andExpect(jsonPath("$.lastName").value(profileDto.lastName()));

        verify(profileService).findProfile(lastName, firstName, "", "", dateOfBirth);
    }

}