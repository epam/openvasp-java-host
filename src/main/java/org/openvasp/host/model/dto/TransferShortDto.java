package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class TransferShortDto extends TransferBaseDto {

    private CounterpartyShortDto originator, beneficiary;

}
