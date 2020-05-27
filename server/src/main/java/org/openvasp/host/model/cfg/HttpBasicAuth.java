package org.openvasp.host.model.cfg;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class HttpBasicAuth {

    @JsonProperty
    private String name;

    @JsonProperty
    private String password;

}
