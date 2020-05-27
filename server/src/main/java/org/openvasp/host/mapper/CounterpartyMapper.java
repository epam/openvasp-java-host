package org.openvasp.host.mapper;

import org.mapstruct.Mapper;
import org.openvasp.host.model.dto.CounterpartyDto;
import org.openvasp.host.model.dto.CounterpartyShortDto;
import org.openvasp.host.model.jpa.CounterpartyEntity;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Mapper(componentModel = "spring")
public interface CounterpartyMapper {

    CounterpartyDto toDto(CounterpartyEntity entity);

    CounterpartyShortDto toShortDto(CounterpartyEntity entity);

}
