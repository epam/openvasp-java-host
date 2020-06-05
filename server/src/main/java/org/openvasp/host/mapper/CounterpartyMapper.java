package org.openvasp.host.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.openvasp.client.model.*;
import org.openvasp.host.model.dto.CounterpartyDto;
import org.openvasp.host.model.dto.CounterpartyShortDto;
import org.openvasp.host.model.dto.CounterpartyUpdate;
import org.openvasp.host.model.jpa.BirthInfoEntity;
import org.openvasp.host.model.jpa.CounterpartyEntity;
import org.openvasp.host.model.jpa.JurIdEntity;
import org.openvasp.host.model.jpa.NatIdEntity;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Mapper(
        componentModel = "spring",
        imports = {
                Vaan.class
        }
)
public interface CounterpartyMapper {

    CounterpartyDto toDto(CounterpartyEntity entity);

    CounterpartyShortDto toShortDto(CounterpartyEntity entity);

    CounterpartyEntity toEntity(CounterpartyUpdate update);

    void toEntity(CounterpartyUpdate update, @MappingTarget CounterpartyEntity entity);

    @Mapping(target = "address", source = "postalAddress")
    @Mapping(target = "jur", source = "jurIds")
    @Mapping(target = "nat", source = "natIds")
    Originator toOriginator(CounterpartyEntity entity);

    default Beneficiary toBeneficiary(CounterpartyEntity entity) {
        return new Beneficiary(entity.getName(), entity.getVaan());
    }

    @Mapping(target = "natIdType", source = "idType")
    @Mapping(target = "natId", source = "idStr")
    @Mapping(target = "natIdCountry", source = "country")
    @Mapping(target = "natIdIssuer", source = "issuer")
    NaturalPersonId toNaturalPersonId(NatIdEntity entity);

    @Mapping(target = "jurIdType", source = "idType")
    @Mapping(target = "jurId", source = "idStr")
    @Mapping(target = "jurIdCountry", source = "country")
    @Mapping(target = "jurIdIssuer", source = "issuer")
    JuridicalPersonId toJuridicalPersonId(JurIdEntity entity);

    @Mapping(target = "birthCity", source = "birthTown")
    BirthInfo toBirthInfo(BirthInfoEntity entity);

}
