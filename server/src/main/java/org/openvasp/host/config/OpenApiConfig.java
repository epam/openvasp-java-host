package org.openvasp.host.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

/**
 * See details at https://springdoc.org/faq.html
 *
 * @author Olexandr_Bilovol@epam.com
 */
@Configuration
@OpenAPIDefinition(info = @Info(title = "Open VASP Host API", version = "v0.0.2"))
@SecurityScheme(
        name = "basicAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "basic"
)
public class OpenApiConfig {
}
