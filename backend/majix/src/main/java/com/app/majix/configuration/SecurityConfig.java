package com.app.majix.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF for this project (common for non-browser-session React apps)
                .csrf(csrf -> csrf.disable())
                // Enable CORS so your React frontend (port 3000) can talk to Spring Boot (port 8081)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                                // Allow anyone to access the auth endpoints (Login/Register)
                                .requestMatchers("/api/user/auth/**").permitAll()
                                // For the demo, if you haven't implemented Tokens (JWT) yet,
                                // you might need to permit everything else temporarily so the app works:
                                .anyRequest().permitAll()
                        // OR if you want to be strict (but risk breaking features without tokens):
                        // .anyRequest().authenticated()
                );

        return http.build();
    }

    // CORS Configuration to allow your frontend
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Your React Frontend URL
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}