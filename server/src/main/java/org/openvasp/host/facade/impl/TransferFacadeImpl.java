package org.openvasp.host.facade.impl;

import lombok.NonNull;
import lombok.val;
import org.openvasp.host.common.exception.HttpBadRequestException;
import org.openvasp.host.facade.TransferFacade;
import org.openvasp.host.mapper.TransferMapper;
import org.openvasp.host.model.dto.TransferDto;
import org.openvasp.host.model.dto.TransferFindRequest;
import org.openvasp.host.model.dto.TransferShortDto;
import org.openvasp.host.model.dto.TransferUpdate;
import org.openvasp.host.service.CounterpartyService;
import org.openvasp.host.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Component
public class TransferFacadeImpl implements TransferFacade {

    private static final String ERR_INVALID_ORIGINATOR_ID = "Invalid originator ID: %d";
    private static final String ERR_INVALID_BENEFICIARY_ID = "Invalid beneficiary ID: %d";

    private final TransferMapper mapper;
    private final TransferService service;
    private final CounterpartyService counterpartyService;

    @Autowired
    public TransferFacadeImpl(
            final TransferMapper mapper,
            final TransferService service,
            final CounterpartyService counterpartyService) {

        this.mapper = mapper;
        this.service = service;
        this.counterpartyService = counterpartyService;
    }

    @Cacheable(cacheNames = "transfer", keyGenerator = "toStringKeyGenerator")
    @Override
    public Page<TransferShortDto> find(@NonNull final TransferFindRequest request) {
        return service.find(request).map(mapper::toShortDto);
    }

    @Cacheable(cacheNames = "transfer", key = "#id")
    @Override
    public Optional<TransferDto> findById(@NonNull final Integer id) {
        return service.findById(id).map(mapper::toDto);
    }

    @Cacheable(cacheNames = "transfer", key = "'find-all'")
    @Override
    public List<TransferShortDto> findAll() {
        return service.findAll()
                .stream()
                .map(mapper::toShortDto)
                .collect(Collectors.toList());
    }

    @CachePut(cacheNames = "transfer", key = "#result.id")
    @Override
    public TransferDto create(@NonNull final TransferUpdate update) {
        val originator = counterpartyService
                .findById(update.getOriginatorId())
                .orElseThrow(() -> new HttpBadRequestException(ERR_INVALID_ORIGINATOR_ID, update.getOriginatorId()));

        val beneficiary = counterpartyService
                .findById(update.getBeneficiaryId())
                .orElseThrow(() -> new HttpBadRequestException(ERR_INVALID_BENEFICIARY_ID, update.getBeneficiaryId()));

        val result = mapper.toEntity(update);
        result.setOriginator(originator);
        result.setBeneficiary(beneficiary);
        return mapper.toDto(service.save(result));
    }

    @CachePut(cacheNames = "transfer", key = "#id")
    @Override
    public TransferDto update(@NonNull final Integer id, @NonNull final TransferUpdate update) {
        val resultOpt = service.findById(id);
        if (!resultOpt.isPresent()) {
            throw new HttpBadRequestException("Invalid transfer ID: %d", id);
        }

        val originator = counterpartyService
                .findById(update.getOriginatorId())
                .orElseThrow(() -> new HttpBadRequestException(ERR_INVALID_ORIGINATOR_ID, update.getOriginatorId()));

        val beneficiary = counterpartyService
                .findById(update.getBeneficiaryId())
                .orElseThrow(() -> new HttpBadRequestException(ERR_INVALID_BENEFICIARY_ID, update.getBeneficiaryId()));

        val result = resultOpt.get();
        result.setUpdated(LocalDateTime.now());
        result.setAssetType(update.getAssetType());
        result.setAmount(update.getAmount());
        result.setTxHash(update.getTxHash());
        result.setSendAddr(update.getSendAddr());
        result.setDestAddr(update.getDestAddr());
        result.setOriginator(originator);
        result.setBeneficiary(beneficiary);
        return mapper.toDto(service.save(result));
    }

    @CacheEvict(cacheNames = "transfer", key = "#id")
    @Override
    public void delete(@NonNull final Integer id) {
        service.delete(id);
    }

}
