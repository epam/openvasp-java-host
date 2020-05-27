package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.CounterpartyType;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public abstract class CounterpartyBaseDto {

    private Integer id;
    private CounterpartyType type;
    private Vaan vaan;
    private String name;

}
