package org.openvasp.host.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.openvasp.client.model.Vaan;
import org.openvasp.client.model.VaspCode;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@RestController
@RequestMapping(path = "/api/v1/vaan")
@CrossOrigin
@Validated
@Slf4j
public class VaanController {

    @GetMapping(path = "/{vaspCode}/{customerNr}")
    @Operation(
            security = @SecurityRequirement(name = "basicAuth"),
            summary = "Generate a new VAAN by a VASP code and a customer number")
    public String generate(
            @PathVariable @Size(min = 8, max = 8) @Pattern(regexp = "([0-9a-fA-F]){8}") final String vaspCode,
            @PathVariable @Size(min = 10, max = 10) @Pattern(regexp = "([0-9a-fA-F]){10}") final String customerNr) {

        log.debug("generate: VASP code = {}, customer nr = {}", vaspCode, customerNr);
        return new Vaan(new VaspCode(vaspCode), customerNr).getData();
    }

}
