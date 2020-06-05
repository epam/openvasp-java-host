package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.CounterpartyRole;
import org.openvasp.host.model.CounterpartyType;

import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class CounterpartyUpdate {

    @NotNull
    private CounterpartyRole role;

    @NotNull
    private CounterpartyType type;

    @NotNull
    private Vaan vaan;

    @NotNull
    private String name;

    private String bic;

    private BirthInfoDto birth;

    private PostalAddressDto postalAddress;

    private Set<NatIdDto> natIds;

    private Set<JurIdDto> jurIds;

}
