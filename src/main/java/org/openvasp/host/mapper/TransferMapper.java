package org.openvasp.host.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.openvasp.client.model.TransferDispatch;
import org.openvasp.client.model.TransferInfo;
import org.openvasp.client.model.TransferRequest;
import org.openvasp.host.model.dto.TransferDto;
import org.openvasp.host.model.dto.TransferShortDto;
import org.openvasp.host.model.dto.TransferUpdate;
import org.openvasp.host.model.jpa.TransferEntity;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Mapper(
        componentModel = "spring",
        imports = {
                LocalDateTime.class,
                ZonedDateTime.class
        },
        uses = {
                CounterpartyMapper.class
        }
)
public interface TransferMapper {

    TransferDto toDto(TransferEntity entity);

    TransferShortDto toShortDto(TransferEntity entity);

    @Mapping(target = "trType", constant = "OUTGOING")
    @Mapping(target = "trStatus", constant = "CREATED")
    TransferEntity toEntity(TransferUpdate update);

    @Mapping(target = "assetType", source = "transfer.assetType")
    @Mapping(target = "amount", source = "transfer.amount")
    void toEntity(TransferRequest request, @MappingTarget TransferEntity entity);

    @Mapping(target = "txHash", source = "tx.id")
    @Mapping(target = "txDateTime", source = "tx.dateTime")
    @Mapping(target = "sendAddr", source = "tx.sendingAddress")
    void toEntity(TransferDispatch request, @MappingTarget TransferEntity entity);

    @Mapping(target = "transfer.assetType", source = "assetType")
    @Mapping(target = "transfer.amount", source = "amount")
    @Mapping(target = "destinationAddress", source = "destAddr")
    @Mapping(target = "transfer.transferType", expression = "java(org.openvasp.client.model.TransferRequest.TransferType.BLOCKCHAIN_TRANSFER)")
    @Mapping(target = "tx.id", source = "txHash")
    @Mapping(target = "tx.sendingAddress", source = "sendAddr")
    @Mapping(target = "tx.dateTime", expression = "java(ZonedDateTime.now())")
    TransferInfo toTransferInfo(TransferEntity entity);

}
