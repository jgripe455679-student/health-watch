package com.crawler.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.crawler.backend.enums.Roles;
import com.crawler.backend.exception.ResourceNotFoundException;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.RoleRepository;
import com.crawler.backend.repository.UserRepository;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
@ConfigurationPropertiesScan
@OpenAPIDefinition(info = @Info(title = "HealthWatch API Application", version = "0.0.1", description = "HealthWatch API"))
@RequiredArgsConstructor
@EnableJpaRepositories
public class BackendApplication implements CommandLineRunner {

        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final PasswordEncoder passwordEncoder;

        @Value("${SYSADMIN_USERNAME}")
        private String sys_admin;
        @Value("${SYSADMIN_PASSWORD}")
        private String sys_admin_password;
        @Value("${SYSUSER_USERNAME}")
        private String sys_user;
        @Value("${SYSUSER_PASSWORD}")
        private String sys_user_password;

        public static void main(String[] args) {
                SpringApplication.run(BackendApplication.class, args);
        }

        @Override
        public void run(String... args) {
                createUsers();
                User system_administrator = userRepository.findByUsername(sys_admin).orElseThrow(
                                () -> new ResourceNotFoundException("Username not found"));
                system_administrator.setAccountNonExpired(true);
                system_administrator.setAccountNonLocked(true);
                system_administrator.setCredentialsNonExpired(true);
                system_administrator.setEnabled(true);
                userRepository.save(system_administrator);

                User system_user = userRepository.findByUsername(sys_user).orElseThrow(
                                () -> new ResourceNotFoundException("Username not found"));
                system_user.setAccountNonExpired(true);
                system_user.setAccountNonLocked(true);
                system_user.setCredentialsNonExpired(true);
                system_user.setEnabled(true);
                userRepository.save(system_user);
        }

        public void createRoles() {
                if (!roleRepository.findAll().isEmpty()) {
                        return;
                }
                roleRepository.saveAll(List.of(
                                Role.builder()
                                                .name(Roles.ADMIN.name())
                                                .build(),
                                Role.builder()
                                                .name(Roles.USER.name())
                                                .build()));
        }

        public void createUsers() {
                if (!userRepository.findAll().isEmpty())
                        return;

                createRoles();

                Role roleAdmin = roleRepository.findByName(Roles.ADMIN.name()).get();
                Role roleUser = roleRepository.findByName(Roles.USER.name()).get();

                User admin = User.builder()
                                .username(sys_admin)
                                .password(passwordEncoder.encode(sys_admin_password))
                                .role(roleAdmin)
                                .build();

                User user = User.builder()
                                .username(sys_user)
                                .password(passwordEncoder.encode(sys_user_password))
                                .role(roleUser)
                                .build();

                List<User> users = List.of(user, admin);
                userRepository.saveAll(users);
        }

}
