package org.openvasp.host.facade;

import org.openvasp.host.model.dto.CounterpartyDto;
import org.openvasp.host.model.dto.CounterpartyShortDto;

import java.util.List;
import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface CounterpartyFacade {

    List<CounterpartyShortDto> findAll();

    Optional<CounterpartyDto> findById(Integer id);

}
