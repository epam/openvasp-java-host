package org.openvasp.host.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.openvasp.host.facade.VaspInfoFacade;
import org.openvasp.host.model.cfg.HostConfig;
import org.openvasp.host.model.dto.VaspInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@RestController
@RequestMapping(path = "/api/v1/vasp")
@CrossOrigin
@Validated
@Slf4j
public class VaspInfoController {

    private final HostConfig hostConfig;
    private final VaspInfoFacade facade;

    @Autowired
    public VaspInfoController(
            final HostConfig hostConfig,
            final VaspInfoFacade facade) {

        this.hostConfig = hostConfig;
        this.facade = facade;
    }

    @GetMapping
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Get all VASP objects ")
    public List<VaspInfoDto> findAll() {
        log.debug("findAll");
        return facade.findAll();
    }

    @GetMapping(path = "/current")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Get current VASP objects ")
    public VaspInfoDto getCurrent() {
        log.debug("getCurrent");
        val result = new VaspInfoDto();
        val vaspInfo = hostConfig.getVaspConfig().getVaspInfo();
        result.setId(vaspInfo.getVaspId().getData());
        result.setVaspCode(vaspInfo.getVaspCode());
        result.setName(vaspInfo.getName());
        return result;
    }

}
