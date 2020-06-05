package org.openvasp.host.model.jpa;

import lombok.EqualsAndHashCode;
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
@Table(name = "session_state")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class SessionStateEntity implements JpaEntity<String> {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "json_str")
    private String json;

}
