package org.openvasp.host.model.jpa;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface JpaEntity<ID> {

    ID getId();

    void setId(ID id);

}
