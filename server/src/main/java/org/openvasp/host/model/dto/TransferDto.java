package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class TransferDto extends TransferBaseDto {

    private String txHash;
    private String sendAddr;
    private String destAddr;
    private Integer sessionReplyCode;
    private Integer transferReplyCode;
    private CounterpartyDto originator, beneficiary;

}
