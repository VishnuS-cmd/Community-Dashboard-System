package com.studentfactory.generated.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final JwtFilter jwtFilter;

  public SecurityConfig(JwtFilter jwtFilter) {
    this.jwtFilter = jwtFilter;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

      // Custom 401 entry point: return JSON instead of redirect
      .exceptionHandling(ex -> ex
        .authenticationEntryPoint((request, response, authException) -> {
          response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
          response.setContentType("application/json");
          response.getWriter().write(
            new ObjectMapper().writeValueAsString(Map.of(
              "error", "Unauthorized",
              "message", "Authentication is required. Please log in."
            ))
          );
        })
        // Custom 403 entry point: return JSON so the frontend can handle it cleanly
        .accessDeniedHandler((request, response, accessDeniedException) -> {
          response.setStatus(HttpServletResponse.SC_FORBIDDEN);
          response.setContentType("application/json");
          response.getWriter().write(
            new ObjectMapper().writeValueAsString(Map.of(
              "error", "Forbidden",
              "message", "You do not have permission to access this resource."
            ))
          );
        })
      )

      .authorizeHttpRequests(auth -> auth

        // ── Public endpoints ──────────────────────────────────────────────
        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
        .requestMatchers(HttpMethod.GET, "/api/health").permitAll()
        .requestMatchers(HttpMethod.GET,
            "/api/docs", "/api/docs-json", "/api/docs/**",
            "/swagger-ui.html", "/swagger-ui/**",
            "/v3/api-docs", "/v3/api-docs/**").permitAll()

        // ── ADMIN-only endpoints ──────────────────────────────────────────
        // Reports (summary + CSV export)
        .requestMatchers("/api/reports/**").hasRole("ADMIN")
        // Audit trail
        .requestMatchers("/api/audit-logs").hasRole("ADMIN")
        .requestMatchers("/api/audit-logs/**").hasRole("ADMIN")
        // User and role administration
        .requestMatchers("/api/users").hasRole("ADMIN")
        .requestMatchers("/api/users/**").hasRole("ADMIN")
        .requestMatchers("/api/roles").hasRole("ADMIN")
        .requestMatchers("/api/roles/**").hasRole("ADMIN")

        // ── ADMIN + OPERATOR endpoints ────────────────────────────────────
        // Five community domain entities (CRUD)
        .requestMatchers("/api/domain/**").hasAnyRole("ADMIN", "OPERATOR")
        // Dashboard stats and modules
        .requestMatchers("/api/dashboard/**").hasAnyRole("ADMIN", "OPERATOR")

        // ── All other /api/** require a valid JWT (any authenticated role) ──
        .requestMatchers("/api/**").authenticated()

        .anyRequest().permitAll()
      )
      .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    // Allow frontend origins (add your deployed URL here in production)
    config.setAllowedOriginPatterns(List.of("http://localhost:*", "http://127.0.0.1:*"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}