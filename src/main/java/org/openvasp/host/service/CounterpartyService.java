package org.openvasp.host.service;

import org.openvasp.client.model.Beneficiary;
import org.openvasp.client.model.Originator;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.jpa.CounterpartyEntity;

import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface CounterpartyService extends BaseJpaService<Integer, CounterpartyEntity> {

    Optional<CounterpartyEntity> findByVaan(Vaan vaan);

    CounterpartyEntity saveIncomingOriginator(Originator originator);

    CounterpartyEntity saveIncomingBeneficiary(Beneficiary originator);

}
