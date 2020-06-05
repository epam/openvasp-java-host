package org.openvasp.host.mapper;

import org.mapstruct.Mapper;
import org.openvasp.host.model.dto.VaspInfoDto;
import org.openvasp.host.model.jpa.VaspInfoEntity;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Mapper(componentModel = "spring")
public interface VaspInfoMapper {

    VaspInfoDto toDto(VaspInfoEntity entity);

}
