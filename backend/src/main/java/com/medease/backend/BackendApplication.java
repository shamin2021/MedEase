package com.medease.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(BackendApplication.class, args);
	}

	// cors configuration is applied to all the origins
	@Bean
	public WebMvcConfigurer CorsConfig() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings( @NonNull CorsRegistry registry ) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000")
						.allowedHeaders("*")
						.allowedMethods("*")
						.allowCredentials(true);
			}
		};
	}


}
