package org.openvasp.host.facade;

import org.openvasp.host.model.dto.VaspInfoDto;

import java.util.List;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface VaspInfoFacade {

    List<VaspInfoDto> findAll();

}
