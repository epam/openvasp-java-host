package org.openvasp.host.model.jpa;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.Country;
import org.openvasp.host.model.jpa.convert.JpaCountryConverter;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.MappedSuperclass;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@MappedSuperclass
@Getter
@Setter
public class PersonIdEntity {

    @Column(name = "id_str")
    private String idStr;

    @Column(name = "country")
    @Convert(converter = JpaCountryConverter.class)
    private Country country;

    @Column(name = "issuer")
    private String issuer;

}
