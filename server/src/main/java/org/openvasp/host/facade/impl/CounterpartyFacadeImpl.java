package org.openvasp.host.facade.impl;

import lombok.NonNull;
import org.openvasp.host.facade.CounterpartyFacade;
import org.openvasp.host.mapper.CounterpartyMapper;
import org.openvasp.host.model.dto.CounterpartyDto;
import org.openvasp.host.model.dto.CounterpartyShortDto;
import org.openvasp.host.service.CounterpartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Component
public class CounterpartyFacadeImpl implements CounterpartyFacade {

    private final CounterpartyService counterpartyService;
    private final CounterpartyMapper counterpartyMapper;

    @Autowired
    public CounterpartyFacadeImpl(
            final CounterpartyService counterpartyService,
            final CounterpartyMapper counterpartyMapper) {

        this.counterpartyService = counterpartyService;
        this.counterpartyMapper = counterpartyMapper;
    }

    @Cacheable(cacheNames = "originator", key = "'find-all'")
    @Override
    public List<CounterpartyShortDto> findAll() {
        return counterpartyService.findAll()
                .stream()
                .map(counterpartyMapper::toShortDto)
                .collect(Collectors.toList());
    }

    @Cacheable(cacheNames = "originator", key = "#id")
    @Override
    public Optional<CounterpartyDto> findById(@NonNull final Integer id) {
        return counterpartyService.findById(id).map(counterpartyMapper::toDto);
    }

}
