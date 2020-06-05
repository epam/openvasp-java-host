package org.openvasp.host.facade.impl;

import lombok.extern.slf4j.Slf4j;
import org.openvasp.host.facade.VaspInfoFacade;
import org.openvasp.host.mapper.VaspInfoMapper;
import org.openvasp.host.model.dto.VaspInfoDto;
import org.openvasp.host.service.VaspInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Component
@Slf4j
public class VaspInfoFacadeImpl implements VaspInfoFacade {

    private final VaspInfoMapper mapper;
    private final VaspInfoService service;

    @Autowired
    public VaspInfoFacadeImpl(final VaspInfoMapper mapper, final VaspInfoService service) {
        this.mapper = mapper;
        this.service = service;
    }

    @Override
    public List<VaspInfoDto> findAll() {
        return service.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

}
