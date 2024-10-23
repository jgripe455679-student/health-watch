package com.crawler.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.crawler.backend.model.Role;
import com.crawler.backend.model.User;
import com.crawler.backend.repository.UserRepository;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "HealthWatch API Application", version = "0.0.1", description = "HealthWatch API"))
public class BackendApplication implements CommandLineRunner {

	private final UserRepository userRepository;

	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	public BackendApplication(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

	}

	@Override
	public void run(String... args) {
		if (userRepository.findByUsername("sys_dev") == null) {
			User user = new User("sys_dev", encoder.encode("password1"), Role.ADMIN);
			userRepository.save(user);
		}
	}

}
