package org.openvasp.host.service;

import org.openvasp.client.session.impl.SessionState;
import org.openvasp.host.model.jpa.SessionStateEntity;

import java.util.List;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface SessionStateService extends BaseJpaService<String, SessionStateEntity> {

    List<SessionState> getAll();

    SessionState saveState(SessionState state);

}
