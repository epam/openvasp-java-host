package org.openvasp.host.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.openvasp.host.facade.CounterpartyFacade;
import org.openvasp.host.model.dto.CounterpartyDto;
import org.openvasp.host.model.dto.CounterpartyShortDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    private final CounterpartyFacade counterpartyFacade;

    @Autowired
    public CounterpartyController(final CounterpartyFacade counterpartyFacade) {
        this.counterpartyFacade = counterpartyFacade;
    }

    @GetMapping(path = "/all")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Get all counterparties objects")
    public List<CounterpartyShortDto> findAll() {
        log.debug("findAll");
        return counterpartyFacade.findAll();
    }

    @GetMapping(path = "/{id}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Find counterparty object by ID")
    public Optional<CounterpartyDto> findById(
            @PathVariable @Positive Integer id) {

        log.debug("findById: {}", id);
        return counterpartyFacade.findById(id);
    }

}
