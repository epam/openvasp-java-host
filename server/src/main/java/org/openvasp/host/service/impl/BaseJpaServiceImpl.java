package org.openvasp.host.service.impl;

import lombok.NonNull;
import org.openvasp.host.model.jpa.JpaEntity;
import org.openvasp.host.service.BaseJpaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import java.util.List;
import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public abstract class BaseJpaServiceImpl<ID, T extends JpaEntity<ID>, REPO extends JpaRepository<T, ID>> implements BaseJpaService<ID, T> {

    final Logger log = LoggerFactory.getLogger(getClass());

    protected final REPO repo;

    public BaseJpaServiceImpl(final REPO repo) {
        this.repo = repo;
    }

    @Transactional(readOnly = true)
    @Override
    public List<T> findAll() {
        log.debug("findAll");
        return repo.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<T> findById(@NonNull final ID id) {
        log.debug("findById: {}", id);
        return repo.findById(id);
    }

    @Transactional
    @Override
    public T save(@NonNull final T entity) {
        log.debug("save: {}", entity.getId());
        return repo.save(entity);
    }

    @Transactional
    @Override
    public void delete(@NonNull final ID id) {
        log.debug("delete: {}", id);
        repo.deleteById(id);
    }

    protected static Predicate and(
            final CriteriaBuilder cb,
            final Predicate p1,
            final Predicate p2) {

        if (p1 == null && p2 == null) {
            return null;
        }

        if (p1 == null) {
            return p2;
        }

        if (p2 == null) {
            return p1;
        }

        return cb.and(p1, p2);
    }

}
