package com.studentfactory.generated.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
  @Bean
  OpenAPI projectOpenApi() {
    return new OpenAPI().info(new Info().title("Community Dashboard Management System API").version("1.0.0"));
  }
}
