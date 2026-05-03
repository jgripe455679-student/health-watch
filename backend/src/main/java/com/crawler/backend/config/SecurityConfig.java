package com.crawler.backend.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
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
import com.crawler.backend.filter.JwtFilter;
import com.crawler.backend.util.CustomAuthenticationEntryPoint;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        public static final String SWAGGER_UI_URL = "/swagger-ui/**";
        public static final String API_DOCS_URL = "/v3/api-docs/**";
        public static final String RABBITMQ_URL = "/rabbitmq/**";
        public static final String[] DEV_URLS = {
                        SWAGGER_UI_URL, API_DOCS_URL, RABBITMQ_URL
        };

        // private final UserDetailsService userDetailsService;
        private final JwtFilter jwtFilter;
        private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

        // @Bean
        // public AuthenticationProvider authenticationProvider() {
        // DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        // provider.setPasswordEncoder(passwordEncoder());
        // provider.setUserDetailsService(userDetailsService);
        // return provider;
        // }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(cors -> cors.configurationSource(req -> {
                                        CorsConfiguration config = new CorsConfiguration();
                                        config.setAllowedOrigins(Arrays.asList("http://localhost:5173",
                                                        "http://127.0.0.1:5173",
                                                        "http://localhost:5174", "http://127.0.0.1:5174"));
                                        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                                        config.setAllowCredentials(true);
                                        config.setAllowedHeaders(Collections.singletonList("*"));
                                        config.setMaxAge(3600L);
                                        return config;
                                }))
                                .authorizeHttpRequests(authorize -> {
                                        authorize.requestMatchers("/api/v1/auth/login").permitAll();
                                        authorize.requestMatchers("/api/v1/auth/refresh").permitAll();
                                        authorize.requestMatchers(DEV_URLS).permitAll();
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/users/**")
                                                        .hasAuthority(Permissions.USER_READ.getName());
                                        authorize.requestMatchers(HttpMethod.POST, "/api/v1/users/**")
                                                        .hasAuthority(Permissions.USER_CREATE.getName());
                                        authorize.requestMatchers(HttpMethod.PUT, "/api/v1/users/**")
                                                        .hasAuthority(Permissions.USER_UPDATE.getName());
                                        authorize.requestMatchers(HttpMethod.DELETE, "/api/v1/users/**")
                                                        .hasAuthority(Permissions.USER_DELETE.getName());
                                        authorize.requestMatchers(HttpMethod.POST, "/api/v1/profiles/**")
                                                        .hasAuthority(Permissions.PROFILE_CREATE.getName());
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/profiles/**")
                                                        .hasAuthority(Permissions.PROFILE_READ.getName());
                                        authorize.requestMatchers(HttpMethod.PUT, "/api/v1/profiles/**")
                                                        .hasAuthority(Permissions.PROFILE_UPDATE.getName());
                                        authorize.requestMatchers(HttpMethod.DELETE, "/api/v1/profiles/**")
                                                        .hasAuthority(Permissions.PROFILE_DELETE.getName());
                                        authorize.requestMatchers(HttpMethod.POST, "/api/v1/records/**")
                                                        .hasAuthority(Permissions.RECORD_CREATE.getName());
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/records/**")
                                                        .hasAuthority(Permissions.RECORD_READ.getName());
                                        authorize.requestMatchers(HttpMethod.PUT, "/api/v1/records/**")
                                                        .hasAuthority(Permissions.RECORD_UPDATE.getName());
                                        authorize.requestMatchers(HttpMethod.DELETE, "/api/v1/records/**")
                                                        .hasAuthority(Permissions.RECORD_DELETE.getName());
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/reports/**")
                                                        .hasAuthority(Permissions.RECORD_COUNT_READ.getName());
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/reports/**")
                                                        .hasAuthority(Permissions.DEPARTMENT_USAGE_READ.getName());
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/reports/**")
                                                        .hasAuthority(Permissions.DEMOGRAPHICS_ANALYSIS_READ.getName());
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/reports/**")
                                                        .hasAuthority(Permissions.BP_TRENDS_READ.getName());
                                        authorize.requestMatchers(HttpMethod.GET, "/api/v1/reports/**")
                                                        .hasAuthority(Permissions.BMI_ANALYSIS_READ.getName());
                                        authorize.anyRequest().authenticated();
                                })
                                .httpBasic(Customizer.withDefaults())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .exceptionHandling(exception -> exception
                                                .authenticationEntryPoint(customAuthenticationEntryPoint))
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }

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
