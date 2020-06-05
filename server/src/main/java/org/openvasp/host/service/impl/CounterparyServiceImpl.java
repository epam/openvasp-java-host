package org.openvasp.host.service.impl;

import lombok.NonNull;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.jpa.CounterpartyEntity;
import org.openvasp.host.repo.CounterpartyRepo;
import org.openvasp.host.service.CounterpartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Service
public class CounterparyServiceImpl
        extends BaseJpaServiceImpl<Integer, CounterpartyEntity, CounterpartyRepo>
        implements CounterpartyService {

    @Autowired
    public CounterparyServiceImpl(final CounterpartyRepo repo) {
        super(CounterpartyEntity.class, repo);
    }

    @Override
    public Optional<CounterpartyEntity> findByVaan(@NonNull final Vaan vaan) {
        return repo.findByVaan(vaan);
    }

}
