package org.openvasp.host.facade.impl;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.openvasp.host.facade.CounterpartyFacade;
import org.openvasp.host.mapper.CounterpartyMapper;
import org.openvasp.host.model.dto.CounterpartyDto;
import org.openvasp.host.model.dto.CounterpartyShortDto;
import org.openvasp.host.model.dto.CounterpartyUpdate;
import org.openvasp.host.model.jpa.CounterpartyEntity;
import org.openvasp.host.service.CounterpartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Component
@Slf4j
public class CounterpartyFacadeImpl implements CounterpartyFacade {

    private final CounterpartyMapper mapper;
    private final CounterpartyService service;
    private final CacheManager cacheManager;

    @Autowired
    public CounterpartyFacadeImpl(
            final CounterpartyMapper mapper,
            final CounterpartyService service,
            final CacheManager cacheManager) {

        this.mapper = mapper;
        this.service = service;
        this.cacheManager = cacheManager;
    }

    @Cacheable(cacheNames = CounterpartyEntity.QUERY_CACHE, key = "'find-all'")
    @Override
    public List<CounterpartyShortDto> findAll() {
        return service.findAll()
                .stream()
                .map(mapper::toShortDto)
                .collect(Collectors.toList());
    }

    @Cacheable(cacheNames = CounterpartyEntity.ENTITY_CACHE, key = "#id")
    @Override
    public Optional<CounterpartyDto> findById(@NonNull final Integer id) {
        return service.findById(id).map(mapper::toDto);
    }

    @CachePut(cacheNames = CounterpartyEntity.ENTITY_CACHE, key = "#result.id")
    @CacheEvict(cacheNames = CounterpartyEntity.QUERY_CACHE, allEntries = true)
    @Override
    public CounterpartyDto create(@NonNull final CounterpartyUpdate update) {
        val entity = mapper.toEntity(update);
        return mapper.toDto(service.save(entity));
    }

    @CachePut(cacheNames = CounterpartyEntity.ENTITY_CACHE, key = "#id")
    @CacheEvict(cacheNames = CounterpartyEntity.QUERY_CACHE, allEntries = true)
    @Override
    public CounterpartyDto update(@NonNull final Integer id, @NonNull final CounterpartyUpdate update) {
        val entity = service.getById(id);
        mapper.toEntity(update, entity);
        entity.setId(id);
        return mapper.toDto(service.save(entity));
    }

    @CacheEvict(cacheNames = CounterpartyEntity.ENTITY_CACHE, key = "#id")
    @Override
    public void delete(@NonNull final Integer id) {
        invalidateTransferQueryCache();
        service.delete(id);
    }

    private void invalidateTransferQueryCache() {
        val cache = cacheManager.getCache(CounterpartyEntity.QUERY_CACHE);
        if (cache != null) {
            cache.invalidate();
            log.debug("Cache '{}' was invalidated", CounterpartyEntity.QUERY_CACHE);
        }
    }

}
