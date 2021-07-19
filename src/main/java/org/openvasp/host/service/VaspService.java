package org.openvasp.host.service;

import org.openvasp.host.model.jpa.TransferEntity;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface VaspService {

    void start();

    void stop();

    TransferEntity sendSessionRequest(int transferId);

    TransferEntity sendSessionReply(int transferId, String responseCode);

    TransferEntity sendTransferRequest(int transferId);

    TransferEntity sendTransferReply(int transferId, String responseCode);

    TransferEntity sendTransferDispatch(int transferId);

    TransferEntity sendTransferConfirmation(int transferId, String responseCode);

}
