package org.openvasp.host.repo;

import org.openvasp.host.model.jpa.CounterpartyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface CounterpartyRepo extends JpaRepository<CounterpartyEntity, Integer> {
}
