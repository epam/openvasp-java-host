package org.openvasp.host.model.jpa;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.openvasp.client.model.VaspCode;
import org.openvasp.host.model.jpa.convert.JpaVaspCodeConverter;

import javax.persistence.*;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Entity
@Table(name = "vasp_info")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class VaspInfoEntity implements JpaEntity<String> {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "vasp_code")
    @Convert(converter = JpaVaspCodeConverter.class)
    private VaspCode vaspCode;

    @Column(name = "name")
    private String name;

}
