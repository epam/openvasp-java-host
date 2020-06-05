package org.openvasp.host.facade;

import org.openvasp.host.model.dto.*;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface TransferFacade {

    Page<TransferShortDto> find(TransferFindRequest request);

    List<TransferShortDto> findAll();

    Optional<TransferDto> findById(Integer id);

    TransferDto create(TransferUpdate update);

    TransferDto update(Integer id, TransferUpdate update);

    void delete(Integer id);

    TransferDto doCommand(Integer transferId, TransferCommand command);

}
