package org.openvasp.host.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.openvasp.host.facade.TransferFacade;
import org.openvasp.host.model.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@RestController
@RequestMapping(path = "/api/v1/transfers")
@CrossOrigin
@Validated
@Slf4j
public class TransferController {

    private final TransferFacade facade;

    @Autowired
    public TransferController(final TransferFacade facade) {
        this.facade = facade;
    }

    @GetMapping(path = "/find")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Find transfer objects by criteria")
    public Page<TransferShortDto> find(
            @Valid final TransferFindRequest request) {

        log.debug("find: {}", request);
        return facade.find(request);
    }

    @GetMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Find a transfer object by ID")
    public Optional<TransferDto> findById(
            @PathVariable @Positive final Integer id) {

        log.debug("findById: {}", id);
        return facade.findById(id);
    }

    @GetMapping
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Get all transfer objects")
    public List<TransferShortDto> findAll() {
        log.debug("findAll");
        return facade.findAll();
    }

    @PostMapping
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Create a new transfer")
    public TransferDto create(
            @RequestBody @Valid final TransferUpdate update) {

        log.debug("create");
        return facade.create(update);
    }

    @PutMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Update a transfer")
    public TransferDto update(
            @PathVariable @Positive final Integer id,
            @RequestBody @Valid final TransferUpdate update) {

        log.debug("update {}", id);
        return facade.update(id, update);
    }

    @DeleteMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Delete a transfer")
    public void delete(
            @PathVariable @Positive final Integer id) {

        log.debug("delete {}", id);
        facade.delete(id);
    }

    @PostMapping(path = "/{id}/command/{command}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Create a new transfer")
    public TransferDto sendCommand(
            @PathVariable @Positive final Integer id,
            @PathVariable final TransferCommand command) {

        log.debug("command {}", command);
        return facade.doCommand(id, command);
    }

}
