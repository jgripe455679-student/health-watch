package com.crawler.backend.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.crawler.backend.enums.Permissions;
import com.crawler.backend.jwt.JwtAuthEntryPoint;
import com.crawler.backend.jwt.JwtFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
        public static final String SWAGGER_UI_URL = "/swagger-ui/**";
        public static final String API_DOCS_URL = "/v3/api-docs/**";
        public static final String[] ALLOWED_URLS = {
                        SWAGGER_UI_URL,
                        API_DOCS_URL
        };

        private final JwtFilter jwtFilter;
        private final JwtAuthEntryPoint jwtAuthEntryPoint;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(cors -> cors
                                                .configurationSource(request -> {
                                                        CorsConfiguration config = new CorsConfiguration();
                                                        config.setAllowedOrigins(Collections
                                                                        .singletonList("http://localhost:5173"));
                                                        config.setAllowedMethods(Collections.singletonList("*"));
                                                        config.setAllowCredentials(true);
                                                        config.setAllowedHeaders(Collections.singletonList("*"));
                                                        config.setMaxAge(3600L);
                                                        return config;
                                                }));
                http
                                .authorizeHttpRequests(authorize -> {
                                        authorize.requestMatchers(ALLOWED_URLS).permitAll();
                                        authorize.requestMatchers("/api/v1/auth/login").permitAll();
                                        authorize.requestMatchers("/api/v1/auth/refresh").permitAll();
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/users/**")
                                                        .hasAuthority(Permissions.USER_READ.getName());
                                        authorize.requestMatchers(HttpMethod.POST, "/api/v1/users/**")
                                                        .hasAuthority(Permissions.USER_CREATE.getName());
                                        authorize.requestMatchers(HttpMethod.PUT, "/api/v1/users/**")
                                                        .hasAuthority(Permissions.USER_UPDATE.getName());
                                        authorize.requestMatchers(HttpMethod.DELETE, "/api/v1/users/**")
                                                        .hasAuthority(Permissions.USER_DELETE.getName());
                                        authorize.anyRequest().authenticated();
                                });

                http
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                http
                                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint));

                http
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();

                // .authorizeHttpRequests(req -> req
                // .requestMatchers("api/v1/auth/**")
                // .permitAll()
                // // .requestMatchers("api/v1/admin/**").hasAuthority(Role.ADMIN.name())
                // // .requestMatchers("api/v1/user/**").hasAnyAuthority(Role.USER.name())
                // .anyRequest().authenticated())
                // .httpBasic(Customizer.withDefaults())
                // .sessionManagement(session ->
                // session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                // .build();
        }

        // @Bean
        // public AuthenticationProvider authenticationProvider() {
        // DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        // provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        // provider.setUserDetailsService(userDetailsService);
        // return provider;
        // }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }

        @Bean
        public static PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder(12);
        }

        // @Bean
        // public UserDetailsService userDetailsService() {
        // UserDetails user1 = User
        // .withDefaultPasswordEncoder()
        // .username("user")
        // .password("password1")
        // .roles("USER")
        // .build();
        // return new InMemoryUserDetailsManager(user1);
        // }
}
