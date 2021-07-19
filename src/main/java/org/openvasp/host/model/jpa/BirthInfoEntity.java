package org.openvasp.host.model.jpa;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.Country;
import org.openvasp.host.model.jpa.convert.JpaCountryConverter;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import java.time.LocalDate;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Embeddable
@Getter
@Setter
public class BirthInfoEntity {

    @Column(name = "birth_town")
    private String birthTown;

    @Column(name = "birth_country")
    @Convert(converter = JpaCountryConverter.class)
    private Country birthCountry;

    @Column(name = "birth_date")
    private LocalDate birthDate;

}
