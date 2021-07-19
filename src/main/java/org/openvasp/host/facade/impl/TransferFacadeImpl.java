package org.openvasp.host.facade.impl;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.openvasp.host.common.exception.HttpBadRequestException;
import org.openvasp.host.facade.TransferFacade;
import org.openvasp.host.mapper.TransferMapper;
import org.openvasp.host.model.cfg.HostConfig;
import org.openvasp.host.model.dto.*;
import org.openvasp.host.model.jpa.TransferEntity;
import org.openvasp.host.service.CounterpartyService;
import org.openvasp.host.service.TransferService;
import org.openvasp.host.service.VaspInfoService;
import org.openvasp.host.service.VaspService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.openvasp.host.model.dto.TransferCommand.REQUEST_TRANSFER;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Component
@Slf4j
public class TransferFacadeImpl implements TransferFacade {

    private final HostConfig hostConfig;
    private final TransferMapper mapper;
    private final TransferService service;
    private final CounterpartyService counterpartyService;
    private final VaspInfoService vaspInfoService;
    private final VaspService vaspService;
    private final CacheManager cacheManager;

    @Autowired
    public TransferFacadeImpl(
            final HostConfig hostConfig,
            final TransferMapper mapper,
            final TransferService service,
            final CounterpartyService counterpartyService,
            final VaspInfoService vaspInfoService,
            final VaspService vaspService,
            final CacheManager cacheManager) {

        this.hostConfig = hostConfig;
        this.mapper = mapper;
        this.service = service;
        this.counterpartyService = counterpartyService;
        this.vaspInfoService = vaspInfoService;
        this.vaspService = vaspService;
        this.cacheManager = cacheManager;
    }

    @Cacheable(cacheNames = TransferEntity.QUERY_CACHE, keyGenerator = "toStringKeyGenerator")
    @Override
    public Page<TransferShortDto> find(@NonNull final TransferFindRequest request) {
        return service.find(request).map(mapper::toShortDto);
    }

    @Cacheable(cacheNames = TransferEntity.QUERY_CACHE, key = "'find-all'")
    @Override
    public List<TransferShortDto> findAll() {
        return service.findAll()
                .stream()
                .map(mapper::toShortDto)
                .collect(Collectors.toList());
    }

    @Cacheable(cacheNames = TransferEntity.ENTITY_CACHE, key = "#id")
    @Override
    public Optional<TransferDto> findById(@NonNull final Integer id) {
        return service.findById(id).map(mapper::toDto);
    }

    @CachePut(cacheNames = TransferEntity.ENTITY_CACHE, key = "#result.id")
    @CacheEvict(cacheNames = TransferEntity.QUERY_CACHE, allEntries = true)
    @Override
    public TransferDto create(@NonNull final TransferUpdate update) {
        val originator = counterpartyService.getById(update.getOriginatorId());
        val beneficiary = counterpartyService.getById(update.getBeneficiaryId());
        val entity = mapper.toEntity(update);
        entity.setOriginator(originator);
        entity.setBeneficiary(beneficiary);
        initCounterpartyVasp(entity);
        invalidateTransferQueryCache();
        return mapper.toDto(service.save(entity));
    }

    @CachePut(cacheNames = TransferEntity.ENTITY_CACHE, key = "#id")
    @CacheEvict(cacheNames = TransferEntity.QUERY_CACHE, allEntries = true)
    @Override
    public TransferDto update(@NonNull final Integer id, @NonNull final TransferUpdate update) {
        val entity = service.getById(id);
        val originator = counterpartyService.getById(update.getOriginatorId());
        val beneficiary = counterpartyService.getById(update.getBeneficiaryId());
        entity.setAssetType(update.getAssetType());
        entity.setAmount(update.getAmount());
        entity.setTxHash(update.getTxHash());
        entity.setSendAddr(update.getSendAddr());
        entity.setDestAddr(update.getDestAddr());
        entity.setOriginator(originator);
        entity.setBeneficiary(beneficiary);
        initCounterpartyVasp(entity);
        invalidateTransferQueryCache();
        return mapper.toDto(service.save(entity));
    }

    @CacheEvict(cacheNames = TransferEntity.ENTITY_CACHE, key = "#id")
    @Override
    public void delete(@NonNull final Integer id) {
        invalidateTransferQueryCache();
        service.delete(id);
    }

    @CacheEvict(cacheNames = TransferEntity.ENTITY_CACHE, key = "#transferId")
    @Override
    public TransferDto doCommand(@NonNull final Integer transferId, @NonNull final TransferCommand command) {
        invalidateTransferQueryCache();

        final TransferEntity result;

        switch (command) {
            case REQUEST_SESSION:
                result = vaspService.sendSessionRequest(transferId);
                break;

            case ACCEPT_SESSION:
                result = vaspService.sendSessionReply(transferId, "1");
                break;

            case DECLINE_SESSION:
                result = vaspService.sendSessionReply(transferId, "2");
                break;

            case REQUEST_TRANSFER:
                result = vaspService.sendTransferRequest(transferId);
                break;

            case ACCEPT_TRANSFER:
                result = vaspService.sendTransferReply(transferId, "1");
                break;

            case DECLINE_TRANSFER:
                result = vaspService.sendTransferReply(transferId, "2");
                break;

            case REQUEST_DISPATCH:
                result = vaspService.sendTransferDispatch(transferId);
                break;

            case ACCEPT_DISPATCH:
                result = vaspService.sendTransferConfirmation(transferId, "1");
                break;

            case DECLINE_DISPATCH:
                result = vaspService.sendTransferConfirmation(transferId, "2");
                break;

            default:
                throw new HttpBadRequestException("Command %s is not supported yet", command.name());
        }

        return mapper.toDto(result);
    }

    private void invalidateTransferQueryCache() {
        val cache = cacheManager.getCache(TransferEntity.QUERY_CACHE);
        if (cache != null) {
            cache.invalidate();
            log.debug("Cache '{}' was invalidated", TransferEntity.QUERY_CACHE);
        }
    }

    private void initCounterpartyVasp(@NonNull final TransferEntity entity) {
        vaspInfoService
                .findByVaspCode(entity.getBeneficiary().getVaan().getVaspCode())
                .ifPresent(entity::setCounterpartyVasp);
    }

}
