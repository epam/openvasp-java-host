package org.openvasp.host.model.jpa;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.Country;
import org.openvasp.host.model.jpa.convert.JpaCountryConverter;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Embeddable
@Getter
@Setter
public class PostalAddressEntity {

    @Column(name = "addr_street")
    private String street;

    @Column(name = "addr_nr")
    private String number;

    @Column(name = "addr_line")
    private String adrline;

    @Column(name = "addr_post_code")
    private String postCode;

    @Column(name = "addr_town")
    private String town;

    @Column(name = "addr_country")
    @Convert(converter = JpaCountryConverter.class)
    private Country country;

}
