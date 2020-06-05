package org.openvasp.host.service.impl;

import lombok.NonNull;
import org.openvasp.client.model.VaspCode;
import org.openvasp.host.model.jpa.VaspInfoEntity;
import org.openvasp.host.repo.VaspInfoRepo;
import org.openvasp.host.service.VaspInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Service
public class VaspInfoServiceImpl
        extends BaseJpaServiceImpl<String, VaspInfoEntity, VaspInfoRepo>
        implements VaspInfoService {


    @Autowired
    public VaspInfoServiceImpl(final VaspInfoRepo repo) {
        super(VaspInfoEntity.class, repo);
    }

    @Override
    public Optional<VaspInfoEntity> findByVaspCode(@NonNull final VaspCode vaspCode) {
        log.debug("findByVaspCode: {}", vaspCode);
        return repo.findByVaspCode(vaspCode);
    }

}
