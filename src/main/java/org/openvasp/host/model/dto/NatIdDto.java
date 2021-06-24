package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.NaturalPersonId.NatIdType;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class NatIdDto extends PersonIdDto {

    private NatIdType idType;

}
