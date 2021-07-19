package org.openvasp.host.repo;

import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.jpa.CounterpartyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface CounterpartyRepo extends JpaRepository<CounterpartyEntity, Integer> {

    Optional<CounterpartyEntity> findByVaan(Vaan vaan);

}
