package org.openvasp.host.service;

import lombok.NonNull;
import org.openvasp.host.model.jpa.JpaEntity;

import java.util.List;
import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface BaseJpaService<ID, T extends JpaEntity<ID>> {

    List<T> findAll();

    Optional<T> findById(ID id);

    T getById(@NonNull final ID id);

    T save(T entity);

    void delete(ID id);

}
