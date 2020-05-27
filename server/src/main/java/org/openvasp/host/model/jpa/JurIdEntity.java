package org.openvasp.host.model.jpa;

import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.JuridicalPersonId.JurIdType;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Enumerated;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Embeddable
@Getter
@Setter
public class JurIdEntity extends PersonIdEntity {

    @Column(name = "id_type")
    @Enumerated
    private JurIdType idType;

}
