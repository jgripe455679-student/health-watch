package com.crawler.backend;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.crawler.backend.enums.Roles;
import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.RoleRepository;
import com.crawler.backend.repository.UserRepository;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "HealthWatch API Application", version = "0.0.1", description = "HealthWatch API"))
@RequiredArgsConstructor
@EnableJpaRepositories
public class BackendApplication implements CommandLineRunner {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

	}

	@Override
	public void run(String... args) {
		createUsers();
	}
	
	public void createUsers() {
        if(!userRepository.findAll().isEmpty())
            return;

        Role roleAdmin = roleRepository.findByName(Roles.ADMIN.name()).get();
        Role roleUser = roleRepository.findByName(Roles.USER.name()).get();

        User admin = User.builder()
                .id(0L)
                .username("admin")
                .password(passwordEncoder.encode("admin"))
                .role(roleAdmin)
                .build();

        User user = User.builder()
                .id(0L)
                .username("user")
                .password(passwordEncoder.encode("user"))
                .role(roleUser)
                .build();

        userRepository.saveAll(List.of(user, admin));
    }

}
