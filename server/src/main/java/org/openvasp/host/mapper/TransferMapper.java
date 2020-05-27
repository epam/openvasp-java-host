package org.openvasp.host.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openvasp.host.model.dto.TransferDto;
import org.openvasp.host.model.dto.TransferShortDto;
import org.openvasp.host.model.dto.TransferUpdate;
import org.openvasp.host.model.jpa.TransferEntity;

import java.time.LocalDateTime;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Mapper(
        componentModel = "spring",
        imports = {
                LocalDateTime.class
        }
)
public interface TransferMapper {

    TransferDto toDto(TransferEntity entity);

    TransferShortDto toShortDto(TransferEntity entity);

    @Mapping(target = "trType", constant = "OUTGOING")
    @Mapping(target = "trStatus", constant = "CREATED")
    @Mapping(target = "created", expression = "java(LocalDateTime.now())")
    @Mapping(target = "updated", expression = "java(LocalDateTime.now())")
    TransferEntity toEntity(TransferUpdate update);

}
