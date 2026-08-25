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

import java.time.LocalDateTime;
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

import com.crawler.backend.dto.UserDto;
import com.crawler.backend.dto.UserRequestDto;
import com.crawler.backend.dto.UserResponseDto;
import com.crawler.backend.enums.Roles;
import com.crawler.backend.exception.AppExceptionHandler;
import com.crawler.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@ActiveProfiles("test")
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@ContextConfiguration(classes = UserController.class)
@Import(AppExceptionHandler.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    UserService userService;

    private UserRequestDto validRequest;
    private UserResponseDto response;

    @BeforeEach
    void setUp() {
        validRequest = new UserRequestDto();
        validRequest.setUsername("test_user");
        validRequest.setPassword("P@ssw0rd123");
        validRequest.setConfirmPassword("P@ssw0rd123");
        validRequest.setRole(Roles.USER.name());
        validRequest.setCreatedBy("admin");
        validRequest.setUpdatedBy("admin");

        response = new UserResponseDto(
                1L,
                "test_user",
                Roles.USER.name(),
                LocalDateTime.now(),
                "admin",
                LocalDateTime.now(),
                "admin",
                true,
                true,
                true,
                true);
    }

    @Test
    void createUser_shouldReturn201CreatedUserResponseDto() throws Exception {
        when(userService.create(any(UserDto.class))).thenReturn(response);
        mockMvc.perform(post("/api/v1/users")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/v1/users/" + response.id()))
                .andExpect(jsonPath("$.id").value(response.id()))
                .andExpect(jsonPath("$.username").value(response.username()));

        verify(userService).create(any(UserDto.class));
    }

    @Test
    void getUsers_shouldReturnReturnListOfUserResponseDto() throws Exception {
        when(userService.getUsers(any(Sort.class))).thenReturn(List.of(response));

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(response.id()))
                .andExpect(jsonPath("$[0].username").value(response.username()));

        verify(userService).getUsers(any(Sort.class));
    }

    @Test
    void getUser_shouldReturnUserResponseDtoById() throws Exception {
        when(userService.getUser(1L)).thenReturn(response);

        mockMvc.perform(get("/api/v1/users/{userId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(response.id()))
                .andExpect(jsonPath("$.username").value(response.username()));

        verify(userService).getUser(1L);
    }

    @Test
    void updateUser_shouldReturnUpdatedUserResponseDto() throws Exception {
        UserDto validUpdateRequest = new UserDto("test_user", "P@ssw0rd123", Roles.USER.name(), "admin", "admin");

        when(userService.updateUser(any(Long.class), any(UserDto.class))).thenReturn(response);

        mockMvc.perform(put("/api/v1/users/{userId}", 1L)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(validUpdateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(response.id()))
                .andExpect(jsonPath("$.username").value(response.username()));

        verify(userService).updateUser(eq(1L), any(UserDto.class));
    }

    @Test
    void disableUser_shouldReturnSuccessMessage() throws Exception {
        String username = "admin";
        String expectedResponse = "User disabled successfully";

        when(userService.disableUser(1L, username)).thenReturn(expectedResponse);

        mockMvc.perform(delete("/api/v1/users/{userId}", 1L)
                .principal(() -> username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(expectedResponse));

        verify(userService).disableUser(1L, username);
    }

    @Test
    void searchByUsername_shouldReturnListOfMatches() throws Exception {
        String username = "test_";
        when(userService.searchByUsername(eq(username), any(Sort.class))).thenReturn(List.of(response));

        mockMvc.perform(get("/api/v1/users/search")
                .param("username", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(response.id()))
                .andExpect(jsonPath("$[0].username").value(response.username()));

        verify(userService).searchByUsername(eq(username), any(Sort.class));
    }

    @Test
    void getUserCount_shouldReturnTotalUserCount() throws Exception {
        long expectedCount = 5L;
        when(userService.getUserCount()).thenReturn(expectedCount);

        mockMvc.perform(get("/api/v1/users/count"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(expectedCount));

        verify(userService).getUserCount();
    }

    @Test
    void getUserByUsername_shouldReturnUserResponseDto() throws Exception {
        String username = "test_user";
        when(userService.getUserByUsername(username)).thenReturn(response);

        mockMvc.perform(get("/api/v1/users/username")
                .param("username", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(response.id()))
                .andExpect(jsonPath("$.username").value(response.username()));

        verify(userService).getUserByUsername(username);
    }

}

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.ArgumentMatchers.anyInt;
// import static org.mockito.Mockito.doNothing;
// import static org.mockito.Mockito.doThrow;
// import static org.mockito.Mockito.when;
// import static
// org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
// import static
// org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static
// org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static
// org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
// import static
// org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
// import static
// org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// import java.util.ArrayList;
// import java.util.List;

// import org.junit.jupiter.api.AfterEach;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import
// org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.setup.MockMvcBuilders;
// import org.springframework.web.context.WebApplicationContext;

// import com.crawler.backend.dto.UserCreateDTO;
// import com.crawler.backend.dto.UserDetailsDTO;
// import com.crawler.backend.dto.UserUpdateDTO;
// import com.crawler.backend.exception.NoUsersFoundException;
// import com.crawler.backend.exception.UserNotFoundException;
// import com.crawler.backend.exception.UsernameAlreadyExistException;
// import com.crawler.backend.model.User;
// import com.crawler.backend.service.UserService;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.databind.ObjectWriter;
// import com.fasterxml.jackson.databind.SerializationFeature;

// @WebMvcTest(UserController.class)
// @ActiveProfiles("test")
// public class UserControllerTest {
// @Autowired
// private WebApplicationContext webApplicationContext;
// @Autowired
// private MockMvc mockMvc;
// @MockBean
// private UserService userService;
// User userOne;
// User userTwo;
// List<UserDetailsDTO> userList = new ArrayList<>();
// UserDetailsDTO userOneDetails;
// UserDetailsDTO userTwoDetails;
// UserCreateDTO userOneCreateRequest;
// UserCreateDTO invalidCreateRequest;
// UserUpdateDTO userOneUpdateRequest;
// UserUpdateDTO invalidUpdateRequest;

// @BeforeEach
// void setUp() {
// mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
// userOne = new User("test", "test");
// userTwo = new User("test1", "test1");
// userOne.setUserId(1);
// userOneDetails = new UserDetailsDTO(userOne.getUserId(),
// userOne.getUsername(),
// userOne.getUserDateCreated(), userOne.getUserIsActive());
// userTwoDetails = new UserDetailsDTO(userTwo.getUserId(),
// userTwo.getUsername(),
// userTwo.getUserDateCreated(),
// userTwo.getUserIsActive());
// userList.add(userOneDetails);
// userList.add(userTwoDetails);
// }

// @AfterEach
// void tearDown() {
// }

// @Test
// void testGetUserDetails_Success() throws Exception {
// when(userService.getUser(userOneDetails.getUserId())).thenReturn(userOneDetails);
// this.mockMvc.perform(get("/api/v1/user/" +
// userOneDetails.getUserId())).andDo(print())
// .andExpect(status().isOk());
// }

// @Test
// void testGetUserDetails_ThrowsException_WhenUserNotFound() throws Exception {
// when(userService.getUser(0)).thenThrow(new UserNotFoundException("User not
// found"));
// this.mockMvc.perform(get("/api/v1/user/0"))
// .andDo(print()).andExpect(status().isBadRequest());
// }

// @Test
// void testGetAllUsers_Success() throws Exception {
// when(userService.getAllUsers()).thenReturn(userList);
// this.mockMvc.perform(get("/api/v1/users"))
// .andDo(print()).andExpect(status().isOk());
// }

// @Test
// void testGetAllUsers_ThrowsException_WhenNoUsersFound() throws Exception {
// when(userService.getAllUsers()).thenThrow(new NoUsersFoundException("No users
// found"));
// this.mockMvc.perform(get("/api/v1/users"))
// .andDo(print()).andExpect(status().isInternalServerError());
// }

// @Test
// void testDeleteUser_Success() throws Exception {
// when(userService.deleteUser(userOneDetails.getUserId())).thenReturn(true);
// this.mockMvc.perform(delete("/api/v1/user/" +
// userOneDetails.getUserId())).andDo(print())
// .andExpect(status().isOk());
// }

// @Test
// void testDeleteUser_ThrowsException_WhenUserNotFound() throws Exception {
// when(userService.deleteUser(0)).thenThrow(new UserNotFoundException("User not
// found"));
// this.mockMvc.perform(delete("/api/v1/user/0"))
// .andDo(print()).andExpect(status().isNotFound());
// }

// @Test
// void testCreateUser_Success() throws Exception {
// userOneCreateRequest = new UserCreateDTO(userOne.getUsername(),
// userOne.getUserPassword(),
// userOne.getUserPassword());
// ObjectMapper mapper = new ObjectMapper();
// mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
// ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
// String requestJson = ow.writeValueAsString(userOneCreateRequest);

// doNothing().when(userService).createUser(userOne);
// this.mockMvc.perform(post("/api/v1/user").with(SecurityMockMvcRequestPostProcessors.csrf())
// .contentType(MediaType.APPLICATION_JSON).content(requestJson))
// .andDo(print()).andExpect(status().isOk());
// }

// @Test
// void testCreateUser_ThrowsException_WhenUsernameAlreadyExist() throws
// Exception {
// invalidCreateRequest = new UserCreateDTO("test", "test",
// "test");
// ObjectMapper mapper = new ObjectMapper();
// mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
// ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
// String requestJson = ow.writeValueAsString(invalidCreateRequest);

// doThrow(new UsernameAlreadyExistException("Username already
// exist")).when(userService)
// .createUser(any());
// this.mockMvc.perform(post("/api/v1/user")
// .contentType(MediaType.APPLICATION_JSON).content(requestJson))
// .andDo(print()).andExpect(status().isConflict());
// }

// @Test
// void testUpdateUser_Success() throws Exception {
// userOneUpdateRequest = new UserUpdateDTO(userOneDetails.getUsername(),
// userOne.getUserPassword(),
// userOne.getUserPassword(), userOneDetails.getUserIsActive());
// ObjectMapper mapper = new ObjectMapper();
// mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
// ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
// String requestJson = ow.writeValueAsString(userOneUpdateRequest);

// doNothing().when(userService).updateUser(userOneDetails.getUserId(),
// userOneUpdateRequest);
// this.mockMvc
// .perform(put("/api/v1/user/" + userOneDetails.getUserId())
// .contentType(MediaType.APPLICATION_JSON)
// .content(requestJson))
// .andDo(print()).andExpect(status().isOk());
// }

// @Test
// void testUpdateUser_ThrowsException_WhenUserNotFound() throws Exception {
// invalidUpdateRequest = new UserUpdateDTO("test", "test",
// "test", false);
// ObjectMapper mapper = new ObjectMapper();
// mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
// ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
// String requestJson = ow.writeValueAsString(invalidUpdateRequest);

// doThrow(new UserNotFoundException("User not
// found")).when(userService).updateUser(anyInt(),
// any());
// this.mockMvc
// .perform(put("/api/v1/user/1")
// .contentType(MediaType.APPLICATION_JSON)
// .content(requestJson))
// .andDo(print()).andExpect(status().isNotFound());
// }

// @Test
// void testUpdateUser_ThrowsException_WhenUsernameAlreadyExist() throws
// Exception {
// invalidUpdateRequest = new UserUpdateDTO("test", "test",
// "test", false);
// ObjectMapper mapper = new ObjectMapper();
// mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
// ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
// String requestJson = ow.writeValueAsString(invalidUpdateRequest);

// doThrow(new UsernameAlreadyExistException("Username already
// exist")).when(userService).updateUser(
// anyInt(),
// any());
// this.mockMvc
// .perform(put("/api/v1/user/1")
// .contentType(MediaType.APPLICATION_JSON)
// .content(requestJson))
// .andDo(print()).andExpect(status().isConflict());
// }

// }
