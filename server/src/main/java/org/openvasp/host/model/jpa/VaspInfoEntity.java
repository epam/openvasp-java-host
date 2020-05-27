package org.openvasp.host.model.jpa;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Entity
@Table(name = "vasp_info")
@Getter
@Setter
public class VaspInfoEntity implements JpaEntity<String> {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

}
