package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.TransferRequest.VirtualAssetType;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class TransferUpdate {

    @NotNull
    private VirtualAssetType assetType;

    @NotNull
    private BigDecimal amount;

    @NotNull
    private String txHash;

    private String sendAddr;

    private String destAddr;

    @NotNull
    private Integer originatorId;

    @NotNull
    private Integer beneficiaryId;

}
