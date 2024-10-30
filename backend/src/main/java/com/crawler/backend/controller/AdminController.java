// package com.crawler.backend.controller;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.crawler.backend.dto.UserCreateDTO;
// import com.crawler.backend.dto.UserUpdateDTO;
// import com.crawler.backend.model.User;
// import com.crawler.backend.service.UserService;

// import jakarta.validation.Valid;

// @RestController
// @RequestMapping("/api/v1/admin")
// public class AdminController {
//     private final UserService userService;

//     public AdminController(UserService userService) {
//         this.userService = userService;
//     }

//     @PostMapping("/user/create")
//     public ResponseEntity<String> createUser(@RequestBody @Valid UserCreateDTO userCreateDTO) {
//         if (!userCreateDTO.getPassword().equals(userCreateDTO.getRetypePassword())) {
//             return ResponseEntity.badRequest().body("Passwords do not match");
//         }
//         User user = new User(userCreateDTO.getUsername(), userCreateDTO.getPassword(),
//                 userCreateDTO.getRole());
//         userService.createUser(user);
//         return ResponseEntity.ok("User created successfully");
//     }

//     @GetMapping("/user/{userId}")
//     public ResponseEntity<?> getUserDetails(@PathVariable int userId) {
//         if (userId < 1) {
//             return ResponseEntity.badRequest().body("Invalid ID");
//         }
//         return ResponseEntity.ok().body(userService.getUser(userId));
//     }

//     @GetMapping("/users")
//     public ResponseEntity<?> getAllUsers() {
//         return ResponseEntity.ok().body(userService.getAllUsers());
//     }

//     @PutMapping("/user/{userId}")
//     public ResponseEntity<?> updateUser(@PathVariable int userId, @RequestBody UserUpdateDTO userUpdateRequest) {
//         if (userUpdateRequest.getPassword() != null || userUpdateRequest.getRetypePassword() != null) {
//             if (!userUpdateRequest.getPassword().equals(userUpdateRequest.getRetypePassword())) {
//                 return ResponseEntity.badRequest().body("Passwords do not match");
//             }
//         }
//         userService.updateUser(userId, userUpdateRequest);
//         return ResponseEntity.ok().body("User updated successfully");
//     }

//     @DeleteMapping("/user/{userId}")
//     public ResponseEntity<?> deleteUser(@PathVariable int userId) {
//         if (userService.deleteUser(userId)) {
//             return ResponseEntity.ok().body("User " + userId + " deleted successfully");
//         }
//         return ResponseEntity.internalServerError().build();
//     }
// }
