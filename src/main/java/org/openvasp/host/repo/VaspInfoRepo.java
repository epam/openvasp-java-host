package org.openvasp.host.repo;

import org.openvasp.client.model.VaspCode;
import org.openvasp.host.model.jpa.VaspInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface VaspInfoRepo extends JpaRepository<VaspInfoEntity, String> {

    Optional<VaspInfoEntity> findByVaspCode(VaspCode vaspCode);

}
