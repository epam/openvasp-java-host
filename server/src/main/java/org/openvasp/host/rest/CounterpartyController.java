package org.openvasp.host.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.openvasp.host.facade.CounterpartyFacade;
import org.openvasp.host.model.dto.CounterpartyDto;
import org.openvasp.host.model.dto.CounterpartyShortDto;
import org.openvasp.host.model.dto.CounterpartyUpdate;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping(path = "/api/v1/counterparties")
@CrossOrigin
@Validated
@Slf4j
public class CounterpartyController {

    private final CounterpartyFacade facade;

    @Autowired
    public CounterpartyController(final CounterpartyFacade facade) {
        this.facade = facade;
    }

    @GetMapping
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Get all counterparties objects")
    public List<CounterpartyShortDto> findAll() {
        log.debug("findAll");
        return facade.findAll();
    }

    @GetMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Find counterparty object by ID")
    public Optional<CounterpartyDto> findById(
            @PathVariable @Positive Integer id) {

        log.debug("findById: {}", id);
        return facade.findById(id);
    }

    @PostMapping
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Create a new counterparty")
    public CounterpartyDto create(
            @RequestBody @Valid final CounterpartyUpdate update) {

        log.debug("create");
        return facade.create(update);
    }

    @PutMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Update a counterparty")
    public CounterpartyDto update(
            @PathVariable @Positive final Integer id,
            @RequestBody @Valid final CounterpartyUpdate update) {

        log.debug("update {}", id);
        return facade.update(id, update);
    }

    @DeleteMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Delete a counterparty")
    public void delete(
            @PathVariable @Positive final Integer id) {

        log.debug("delete {}", id);
        facade.delete(id);
    }

}
