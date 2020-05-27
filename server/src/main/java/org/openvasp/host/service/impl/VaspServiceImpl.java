package org.openvasp.host.service.impl;

import org.openvasp.host.model.cfg.HostConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Service
public class VaspServiceImpl {

    private final HostConfig hostConfig;

    @Autowired
    public VaspServiceImpl(
            final HostConfig hostConfig) {

        this.hostConfig = hostConfig;
    }

    @PostConstruct
    void init() {

    }

}
