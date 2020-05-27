package org.openvasp.host.service.impl;

import org.openvasp.host.model.jpa.CounterpartyEntity;
import org.openvasp.host.repo.CounterpartyRepo;
import org.openvasp.host.service.CounterpartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Service
public class CounterparyServiceImpl
        extends BaseJpaServiceImpl<Integer, CounterpartyEntity, CounterpartyRepo>
        implements CounterpartyService {

    @Autowired
    public CounterparyServiceImpl(final CounterpartyRepo counterpartyRepo) {
        super(counterpartyRepo);
    }

}
