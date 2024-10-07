package com.crawler.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.crawler.backend.dto.UserCreateRequest;
import com.crawler.backend.dto.UserDetails;
import com.crawler.backend.dto.UserUpdateRequest;
import com.crawler.backend.exception.NoUsersFoundException;
import com.crawler.backend.exception.UserNotFoundException;
import com.crawler.backend.exception.UsernameAlreadyExistException;
import com.crawler.backend.model.User;
import com.crawler.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

@WebMvcTest(UserController.class)
@ActiveProfiles("test")
public class UserControllerTest {

        @Autowired
        private MockMvc mockMvc;
        @MockBean
        private UserService userService;
        User userOne;
        User userTwo;
        List<UserDetails> userList = new ArrayList<>();
        UserDetails userOneDetails;
        UserDetails userTwoDetails;
        UserCreateRequest userOneCreateRequest;
        UserCreateRequest invalidCreateRequest;
        UserUpdateRequest userOneUpdateRequest;
        UserUpdateRequest invalidUpdateRequest;

        @BeforeEach
        void setUp() {
                userOne = new User("test", "test");
                userTwo = new User("test1", "test1");
                userOne.setUserId(1);
                userOneDetails = new UserDetails(userOne.getUserId(), userOne.getUsername(),
                                userOne.getUserDateCreated(), userOne.getUserIsActive());
                userTwoDetails = new UserDetails(userTwo.getUserId(), userTwo.getUsername(),
                                userTwo.getUserDateCreated(),
                                userTwo.getUserIsActive());
                userList.add(userOneDetails);
                userList.add(userTwoDetails);
        }

        @AfterEach
        void tearDown() {
        }

        @Test
        void testGetUserDetails_Success() throws Exception {
                when(userService.getUser(userOneDetails.getUserId())).thenReturn(userOneDetails);
                this.mockMvc.perform(get("/api/v1/user/" + userOneDetails.getUserId())).andDo(print())
                                .andExpect(status().isOk());
        }

        @Test
        void testGetUserDetails_ThrowsException_WhenUserNotFound() throws Exception {
                when(userService.getUser(0)).thenThrow(new UserNotFoundException("User not found"));
                this.mockMvc.perform(get("/api/v1/user/0")).andDo(print()).andExpect(status().isBadRequest());
        }

        @Test
        void testGetAllUsers_Success() throws Exception {
                when(userService.getAllUsers()).thenReturn(userList);
                this.mockMvc.perform(get("/api/v1/users")).andDo(print()).andExpect(status().isOk());
        }

        @Test
        void testGetAllUsers_ThrowsException_WhenNoUsersFound() throws Exception {
                when(userService.getAllUsers()).thenThrow(new NoUsersFoundException("No users found"));
                this.mockMvc.perform(get("/api/v1/users")).andDo(print()).andExpect(status().isInternalServerError());
        }

        @Test
        void testDeleteUser_Success() throws Exception {
                when(userService.deleteUser(userOneDetails.getUserId())).thenReturn(true);
                this.mockMvc.perform(delete("/api/v1/user/" + userOneDetails.getUserId())).andDo(print())
                                .andExpect(status().isOk());
        }

        @Test
        void testDeleteUser_ThrowsException_WhenUserNotFound() throws Exception {
                when(userService.deleteUser(0)).thenThrow(new UserNotFoundException("User not found"));
                this.mockMvc.perform(delete("/api/v1/user/0")).andDo(print()).andExpect(status().isNotFound());
        }

        @Test
        void testCreateUser_Success() throws Exception {
                userOneCreateRequest = new UserCreateRequest(userOne.getUsername(), userOne.getUserPassword(),
                                userOne.getUserPassword());
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
                ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
                String requestJson = ow.writeValueAsString(userOneCreateRequest);

                doNothing().when(userService).createUser(userOne);
                this.mockMvc.perform(post("/api/v1/user").contentType(MediaType.APPLICATION_JSON).content(requestJson))
                                .andDo(print()).andExpect(status().isOk());
        }

        @Test
        void testCreateUser_ThrowsException_WhenUsernameAlreadyExist() throws Exception {
                invalidCreateRequest = new UserCreateRequest("test", "test",
                                "test");
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
                ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
                String requestJson = ow.writeValueAsString(invalidCreateRequest);

                doThrow(new UsernameAlreadyExistException("Username already exist")).when(userService)
                                .createUser(any());
                this.mockMvc.perform(post("/api/v1/user").contentType(MediaType.APPLICATION_JSON).content(requestJson))
                                .andDo(print()).andExpect(status().isConflict());
        }

        @Test
        void testUpdateUser_Success() throws Exception {
                userOneUpdateRequest = new UserUpdateRequest(userOneDetails.getUsername(), userOne.getUserPassword(),
                                userOne.getUserPassword(), userOneDetails.getUserIsActive());
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
                ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
                String requestJson = ow.writeValueAsString(userOneUpdateRequest);

                doNothing().when(userService).updateUser(userOneDetails.getUserId(), userOneUpdateRequest);
                this.mockMvc
                                .perform(put("/api/v1/user/" + userOneDetails.getUserId())
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content(requestJson))
                                .andDo(print()).andExpect(status().isOk());
        }

        @Test
        void testUpdateUser_ThrowsException_WhenUserNotFound() throws Exception {
                invalidUpdateRequest = new UserUpdateRequest("test", "test",
                                "test", false);
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
                ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
                String requestJson = ow.writeValueAsString(invalidUpdateRequest);

                doThrow(new UserNotFoundException("User not found")).when(userService).updateUser(anyInt(),
                                any());
                this.mockMvc
                                .perform(put("/api/v1/user/1").contentType(MediaType.APPLICATION_JSON)
                                                .content(requestJson))
                                .andDo(print()).andExpect(status().isNotFound());
        }

        @Test
        void testUpdateUser_ThrowsException_WhenUsernameAlreadyExist() throws Exception {
                invalidUpdateRequest = new UserUpdateRequest("test", "test",
                                "test", false);
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
                ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
                String requestJson = ow.writeValueAsString(invalidUpdateRequest);

                doThrow(new UsernameAlreadyExistException("Username already exist")).when(userService).updateUser(
                                anyInt(),
                                any());
                this.mockMvc
                                .perform(put("/api/v1/user/1").contentType(MediaType.APPLICATION_JSON)
                                                .content(requestJson))
                                .andDo(print()).andExpect(status().isConflict());
        }

}
