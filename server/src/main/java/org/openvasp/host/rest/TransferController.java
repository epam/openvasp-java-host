package org.openvasp.host.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.openvasp.host.facade.TransferFacade;
import org.openvasp.host.model.dto.TransferDto;
import org.openvasp.host.model.dto.TransferFindRequest;
import org.openvasp.host.model.dto.TransferShortDto;
import org.openvasp.host.model.dto.TransferUpdate;
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

    private final TransferFacade transferFacade;

    @Autowired
    public TransferController(final TransferFacade transferFacade) {
        this.transferFacade = transferFacade;
    }

    @GetMapping
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Find transfer objects by criteria")
    public Page<TransferShortDto> find(
            @Valid final TransferFindRequest request) {

        log.debug("find: {}", request);
        return transferFacade.find(request);
    }

    @GetMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Find a transfer object by ID")
    public Optional<TransferDto> findById(
            @PathVariable @Positive Integer id) {

        log.debug("findById: {}", id);
        return transferFacade.findById(id);
    }

    @GetMapping(path = "/all")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Get all transfer objects")
    public List<TransferShortDto> findAll() {
        log.debug("findAll");
        return transferFacade.findAll();
    }

    @PostMapping
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Create a new transfer")
    public TransferDto create(
            @RequestBody @Valid final TransferUpdate update) {

        log.debug("create");
        return transferFacade.create(update);
    }

    @PutMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Update a transfer")
    public TransferDto update(
            @PathVariable @Positive Integer id,
            @RequestBody @Valid final TransferUpdate update) {

        log.debug("update {}", id);
        return transferFacade.update(id, update);
    }

    @DeleteMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Delete a transfer")
    public void delete(
            @PathVariable @Positive Integer id) {

        log.debug("delete {}", id);
        transferFacade.delete(id);
    }

}
