package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.JuridicalPersonId.JurIdType;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class JurIdDto extends PersonIdDto {

    private JurIdType idType;

}
