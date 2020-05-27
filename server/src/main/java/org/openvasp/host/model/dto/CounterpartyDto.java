package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class CounterpartyDto extends CounterpartyBaseDto {

    private String bic;
    private BirthInfoDto birth;
    private PostalAddressDto postalAddress;
    private Set<NatIdDto> natIds;
    private Set<JurIdDto> jurIds;

}
