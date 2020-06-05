package org.openvasp.host.repo;

import org.openvasp.host.model.jpa.TransferEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface TransferRepo extends JpaRepository<TransferEntity, Integer>, JpaSpecificationExecutor<TransferEntity> {

    Optional<TransferEntity> findBySessionId(String sessionId);

}
