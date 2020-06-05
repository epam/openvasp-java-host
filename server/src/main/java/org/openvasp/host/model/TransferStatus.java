package org.openvasp.host.model;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public enum TransferStatus {

    CREATED,

    SESSION_REQUESTED,
    SESSION_CONFIRMED,
    SESSION_DECLINED,

    TRANSFER_REQUESTED,
    TRANSFER_FORBIDDEN,
    TRANSFER_ALLOWED,

    TRANSFER_DISPATCHED,
    DISPATCH_CONFIRMED,
    DISPATCH_DECLINED

}
