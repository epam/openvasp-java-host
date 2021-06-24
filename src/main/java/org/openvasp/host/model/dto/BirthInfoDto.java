package org.openvasp.host.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.Country;

import java.time.LocalDate;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class BirthInfoDto {

    private String birthTown;
    private Country birthCountry;
    private LocalDate birthDate;

}
