package org.openvasp.host.model.cfg;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.config.VaspConfig;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class HostConfig {

    @JsonProperty
    private VaspConfig vaspConfig;

    @JsonProperty
    private String infuraSecret;

    @JsonProperty
    private HttpBasicAuth httpBasicAuth;

}
