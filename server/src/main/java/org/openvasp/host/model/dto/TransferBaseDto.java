package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.TransferMessage.VirtualAssetType;
import org.openvasp.host.model.TransferStatus;
import org.openvasp.host.model.TransferType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public abstract class TransferBaseDto {

    private Integer id;
    private TransferType trType;
    private TransferStatus trStatus;
    private String sessionId;
    private LocalDateTime created;
    private LocalDateTime updated;
    private BigDecimal amount;
    private VirtualAssetType assetType;
    private VaspInfoDto counterpartyVasp;

}
