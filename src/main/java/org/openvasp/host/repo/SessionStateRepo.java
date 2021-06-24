package org.openvasp.host.repo;

import org.openvasp.host.model.jpa.SessionStateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public interface SessionStateRepo extends JpaRepository<SessionStateEntity, String> {
}
