package com.assets.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Asset Management API")
                        .description("API REST para gerenciamento de ativos empresariais (computadores, monitores, periféricos, etc.)")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Asset Management")
                                .email("contato@assets.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local"),
                        new Server().url("http://backend:8080").description("Docker")
                ));
    }
}
