package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class TransferDto extends TransferBaseDto {

    private String txHash;
    private ZonedDateTime txDateTime;
    private String sendAddr;
    private String destAddr;
    private Integer sessionReplyCode;
    private Integer transferReplyCode;
    private Integer dispatchReplyCode;
    private CounterpartyDto originator, beneficiary;

}
