package org.openvasp.host.service;

import org.openvasp.host.model.dto.TransferFindRequest;
import org.openvasp.host.model.jpa.TransferEntity;
import org.springframework.data.domain.Page;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface TransferService extends BaseJpaService<Integer, TransferEntity> {

    Page<TransferEntity> find(TransferFindRequest request);

}
