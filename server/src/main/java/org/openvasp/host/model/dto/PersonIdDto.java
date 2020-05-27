package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.Country;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class PersonIdDto {

    private String idStr;
    private Country country;
    private String issuer;

}
