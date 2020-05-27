package org.openvasp.host.config;

import org.openvasp.client.common.Json;
import org.openvasp.host.model.cfg.HostConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Configuration
public class VaspHostAppConfig {

    @Value("${openvasp.host.configNr:1}")
    private Integer hostConfigNr;

    @Bean("hostConfig")
    public HostConfig hostConfig() {
        return Json.loadFileYaml(
                HostConfig.class,
                "config",
                String.format("host-config-%d.yaml", hostConfigNr));
    }

}
