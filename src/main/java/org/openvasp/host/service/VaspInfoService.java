package org.openvasp.host.service;

import org.openvasp.client.model.VaspCode;
import org.openvasp.host.model.jpa.VaspInfoEntity;

import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface VaspInfoService extends BaseJpaService<String, VaspInfoEntity> {

    Optional<VaspInfoEntity> findByVaspCode(VaspCode vaspCode);

}
