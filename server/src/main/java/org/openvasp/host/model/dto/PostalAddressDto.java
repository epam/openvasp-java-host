package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.Country;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class PostalAddressDto {

    private String street;
    private String number;
    private String adrline;
    private String postCode;
    private String town;
    private Country country;

}
