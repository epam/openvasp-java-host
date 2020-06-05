package org.openvasp.host.service.impl;

import lombok.NonNull;
import lombok.val;
import org.openvasp.host.model.dto.TransferFindRequest;
import org.openvasp.host.model.jpa.CounterpartyEntity_;
import org.openvasp.host.model.jpa.TransferEntity;
import org.openvasp.host.model.jpa.TransferEntity_;
import org.openvasp.host.repo.TransferRepo;
import org.openvasp.host.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Service
public class TransferServiceImpl
        extends BaseJpaServiceImpl<Integer, TransferEntity, TransferRepo>
        implements TransferService {

    @Autowired
    public TransferServiceImpl(final TransferRepo repo) {
        super(TransferEntity.class, repo);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<TransferEntity> findBySessionId(@NonNull final String sessionId) {
        log.debug("findBySessionId: {}", sessionId);
        return repo.findBySessionId(sessionId);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<TransferEntity> find(@NonNull final TransferFindRequest request) {
        log.debug("find: {}", request);
        val orders = new ArrayList<Sort.Order>();
        orders.add(new Sort.Order(Sort.Direction.fromString(request.direction()), request.sort().entityField));

        if (TransferFindRequest.SortField.ID != request.sort()) {
            orders.add(new Sort.Order(Sort.Direction.ASC, TransferFindRequest.SortField.ID.entityField));
        }

        val page = PageRequest.of(request.pageNr(), request.pageSize(), Sort.by(orders));
        val spec = buildSpecOf(request);

        return repo.findAll(spec, page);
    }

    private Specification<TransferEntity> buildSpecOf(final TransferFindRequest request) {
        return (Root<TransferEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Predicate result = null;

            if (request.getTrType() != null) {
                result = and(cb, result, cb.equal(root.get(TransferEntity_.trType), request.getTrType()));
            }

            if (request.getTrStatus() != null) {
                result = and(cb, result, cb.equal(root.get(TransferEntity_.trStatus), request.getTrStatus()));
            }

            if (!StringUtils.isEmpty(request.getSessionId())) {
                result = and(cb, result, cb.equal(root.get(TransferEntity_.sessionId), request.getSessionId()));
            }

            if (!StringUtils.isEmpty(request.getOriginatorName())) {
                val originatorPath = root.join(TransferEntity_.originator);
                result = and(cb, result, cb.like(cb.upper(originatorPath.get(CounterpartyEntity_.name)),
                        "%" + request.getOriginatorName().toUpperCase() + "%"));
            }

            if (!StringUtils.isEmpty(request.getOriginatorVaan())) {
                val originatorPath = root.join(TransferEntity_.originator);
                result = and(cb, result, cb.equal(originatorPath.get("vaan"), request.originatorVaan()));
            }

            if (!StringUtils.isEmpty(request.getBeneficiaryName())) {
                val beneficiaryPath = root.join(TransferEntity_.beneficiary);
                result = and(cb, result, cb.like(cb.upper(beneficiaryPath.get(CounterpartyEntity_.name)),
                        "%" + request.getBeneficiaryName().toUpperCase() + "%"));
            }

            if (!StringUtils.isEmpty(request.getBeneficiaryVaan())) {
                val beneficiaryPath = root.join(TransferEntity_.beneficiary);
                result = and(cb, result, cb.equal(beneficiaryPath.get("vaan"), request.beneficiaryVaan()));
            }

            return result;
        };
    }

    @Override
    public TransferEntity save(@NotNull final TransferEntity entity) {
        if (entity.getId() == null) {
            entity.setCreated(LocalDateTime.now());
        }
        entity.setUpdated(LocalDateTime.now());
        return super.save(entity);
    }

}
