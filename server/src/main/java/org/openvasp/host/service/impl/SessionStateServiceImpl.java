package org.openvasp.host.service.impl;

import lombok.NonNull;
import lombok.val;
import org.openvasp.client.common.Json;
import org.openvasp.client.session.impl.SessionState;
import org.openvasp.host.model.jpa.SessionStateEntity;
import org.openvasp.host.repo.SessionStateRepo;
import org.openvasp.host.service.SessionStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Service
public class SessionStateServiceImpl
        extends BaseJpaServiceImpl<String, SessionStateEntity, SessionStateRepo>
        implements SessionStateService {

    @Autowired
    public SessionStateServiceImpl(final SessionStateRepo repo) {
        super(SessionStateEntity.class, repo);
    }

    @Override
    public List<SessionState> getAll() {
        return repo.findAll().stream()
                .map(entity -> Json.fromJson(SessionState.class, entity.getJson()))
                .collect(Collectors.toList());
    }

    @Override
    public SessionState saveState(@NonNull final SessionState state) {
        val entity = new SessionStateEntity();
        entity.setId(state.getId());
        entity.setJson(Json.toJson(state));
        repo.save(entity);
        return state;
    }

}
