package com.crawler.backend;

import java.util.List;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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
public class BackendApplication implements ApplicationRunner {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	// private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	// public BackendApplication(UserRepository userRepository) {
	// this.userRepository = userRepository;
	// }

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		createUsers();
	}

	public void createUsers() {
		if (!userRepository.findAll().isEmpty()) {
			return;
		}

		Role roleAdmin = roleRepository.findByName(Roles.ADMIN.name()).get();
		Role roleUser = roleRepository.findByName(Roles.USER.name()).get();

		User admin = User.builder()
				.id(0L)
				.username("sys_admin")
				.password(passwordEncoder.encode("password1"))
				.role(roleAdmin)
				.build();

		User user = User.builder()
				.id(0L)
				.username("user")
				.password(passwordEncoder.encode("password@"))
				.role(roleUser)
				.build();

		userRepository.saveAll(List.of(user, admin));
	}

	// @Override
	// public void run(String... args) {
	// if (userRepository.findByUsername("sys_dev") == null) {
	// User user = new User("sys_dev", encoder.encode("password1"), ;
	// userRepository.save(user);
	// }
	// }

}
