package org.openvasp.host.service.impl;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.openvasp.client.VaspInstance;
import org.openvasp.client.common.VaspException;
import org.openvasp.client.model.*;
import org.openvasp.client.session.BeneficiarySession;
import org.openvasp.client.session.OriginatorSession;
import org.openvasp.client.session.Session;
import org.openvasp.host.common.exception.HttpBadRequestException;
import org.openvasp.host.common.exception.HttpServiceException;
import org.openvasp.host.mapper.CounterpartyMapper;
import org.openvasp.host.mapper.TransferMapper;
import org.openvasp.host.model.TransferStatus;
import org.openvasp.host.model.TransferType;
import org.openvasp.host.model.cfg.HostConfig;
import org.openvasp.host.model.jpa.CounterpartyEntity;
import org.openvasp.host.model.jpa.TransferEntity;
import org.openvasp.host.model.jpa.VaspInfoEntity;
import org.openvasp.host.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.time.LocalDateTime;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Service
@Slf4j
public class VaspServiceImpl implements VaspService {

    @Autowired
    private HostConfig hostConfig;

    @Autowired
    private CounterpartyMapper counterpartyMapper;

    @Autowired
    private TransferMapper transferMapper;

    @Autowired
    private CounterpartyService counterpartyService;

    @Autowired
    private TransferService transferService;

    @Autowired
    private VaspInfoService vaspInfoService;

    @Autowired
    private SessionStateService sessionStateService;

    @Value("${openvasp.host.vasp-instance.autoconnect:false}")
    private Boolean autoConnect;

    @Autowired(required = false)
    private CacheManager cacheManager;

    private VaspInstance vaspInstance;

    @PostConstruct
    void init() {
        if (autoConnect) {
            start();
        }
    }

    @PreDestroy
    void shutdown() {
        stop();
    }

    @Override
    public void start() {
        val vaspModule = new VaspHostModule(hostConfig);
        vaspInstance = new VaspInstance(vaspModule);
        vaspInstance.setMessageHandler(this::onReceiveMessage);
        vaspInstance.setExceptionHandler(this::clientExceptionHandler);
        vaspInstance.startSessionManager();
        sessionStateService.getAll().forEach(vaspInstance::restoreSession);
    }

    @Override
    public void stop() {
        if (vaspInstance != null) {
            val tmp = vaspInstance;
            vaspInstance = null;
            tmp.close();
        }
    }

    @Override
    public TransferEntity sendSessionRequest(final int transferId) {
        val transferEntity = transferService.getById(transferId);

        checkTransferType(transferEntity, TransferType.OUTGOING);
        checkTransferStatus(transferEntity, TransferStatus.CREATED);

        val transferInfo = transferMapper.toTransferInfo(transferEntity);
        val session = vaspInstance.createOriginatorSession(transferInfo);
        session.startTransfer();
        saveSession(session);

        transferEntity.setSessionId(session.sessionId());
        transferEntity.setTrStatus(TransferStatus.SESSION_REQUESTED);

        return transferService.save(transferEntity);
    }

    @Override
    public TransferEntity sendSessionReply(final int transferId, @NonNull final String responseCode) {
        val transferEntity = transferService.getById(transferId);

        checkTransferType(transferEntity, TransferType.INCOMING);
        checkTransferStatus(transferEntity, TransferStatus.SESSION_REQUESTED);

        val message = new SessionReply();
        message.getHeader().setResponseCode(responseCode);

        val session = getBeneficiarySession(transferEntity.getSessionId());
        session.sendMessage(message);
        saveSession(session);

        transferEntity.setSessionReplyCode(Integer.valueOf(responseCode));
        transferEntity.setTrStatus("1".equals(responseCode)
                ? TransferStatus.SESSION_CONFIRMED
                : TransferStatus.SESSION_DECLINED);

        return transferService.save(transferEntity);
    }

    @Override
    public TransferEntity sendTransferRequest(final int transferId) {
        val transferEntity = transferService.getById(transferId);

        checkTransferType(transferEntity, TransferType.OUTGOING);
        checkTransferStatus(transferEntity, TransferStatus.SESSION_CONFIRMED);

        val transferInfo = transferMapper.toTransferInfo(transferEntity);
        val message = new TransferRequest();
        message.setOriginator(transferInfo.getOriginator());
        message.setBeneficiary(transferInfo.getBeneficiary());
        message.setTransfer(transferInfo.getTransfer());

        val session = getOriginatorSession(transferEntity.getSessionId());
        session.sendMessage(message);
        saveSession(session);

        transferEntity.setTrStatus(TransferStatus.TRANSFER_REQUESTED);

        return transferService.save(transferEntity);
    }

    @Override
    public TransferEntity sendTransferReply(final int transferId, @NonNull final String responseCode) {
        val transferEntity = transferService.getById(transferId);

        checkTransferType(transferEntity, TransferType.INCOMING);
        checkTransferStatus(transferEntity, TransferStatus.TRANSFER_REQUESTED);

        val transferInfo = transferMapper.toTransferInfo(transferEntity);
        val message = new TransferReply();
        message.getHeader().setResponseCode(responseCode);
        message.setOriginator(transferInfo.getOriginator());
        message.setBeneficiary(transferInfo.getBeneficiary());
        message.setTransfer(transferInfo.getTransfer());

        val session = getBeneficiarySession(transferEntity.getSessionId());
        session.sendMessage(message);
        saveSession(session);

        transferEntity.setTransferReplyCode(Integer.valueOf(responseCode));
        transferEntity.setTrStatus("1".equals(responseCode)
                ? TransferStatus.TRANSFER_ALLOWED
                : TransferStatus.TRANSFER_FORBIDDEN);

        return transferService.save(transferEntity);

    }

    @Override
    public TransferEntity sendTransferDispatch(final int transferId) {
        val transferEntity = transferService.getById(transferId);

        checkTransferType(transferEntity, TransferType.OUTGOING);
        checkTransferStatus(transferEntity, TransferStatus.TRANSFER_ALLOWED);

        val transferInfo = transferMapper.toTransferInfo(transferEntity);
        val message = new TransferDispatch();
        message.setOriginator(transferInfo.getOriginator());
        message.setBeneficiary(transferInfo.getBeneficiary());
        message.setTransfer(transferInfo.getTransfer());
        message.setTx(transferInfo.getTx());

        val session = getOriginatorSession(transferEntity.getSessionId());
        session.sendMessage(message);
        saveSession(session);

        transferEntity.setTrStatus(TransferStatus.TRANSFER_DISPATCHED);

        return transferService.save(transferEntity);
    }

    @Override
    public TransferEntity sendTransferConfirmation(final int transferId, @NonNull final String responseCode) {
        val transferEntity = transferService.getById(transferId);

        checkTransferType(transferEntity, TransferType.INCOMING);
        checkTransferStatus(transferEntity, TransferStatus.TRANSFER_DISPATCHED);

        val transferInfo = transferMapper.toTransferInfo(transferEntity);
        val message = new TransferConfirmation();
        message.getHeader().setResponseCode(responseCode);
        message.setOriginator(transferInfo.getOriginator());
        message.setBeneficiary(transferInfo.getBeneficiary());
        message.setTransfer(transferInfo.getTransfer());
        message.setTx(transferInfo.getTx());

        val session = getBeneficiarySession(transferEntity.getSessionId());
        session.sendMessage(message);
        saveSession(session);

        transferEntity.setDispatchReplyCode(Integer.valueOf(responseCode));
        transferEntity.setTrStatus("1".equals(responseCode)
                ? TransferStatus.DISPATCH_CONFIRMED
                : TransferStatus.DISPATCH_DECLINED);

        return transferService.save(transferEntity);
    }

    private void onReceiveMessage(
            @NonNull final VaspMessage message,
            @NonNull final Session session) {

        log.debug("a new message received {}", message);

        saveSession(session);

        invalidateTransferCaches();

        if (message instanceof SessionRequest) {
            onSessionRequest(message.asSessionRequest());
        } else if (message instanceof SessionReply) {
            onSessionReply(message.asSessionReply());
        } else if (message instanceof TransferRequest) {
            onTransferRequest(message.asTransferRequest());
        } else if (message instanceof TransferReply) {
            onTransferReply(message.asTransferReply());
        } else if (message instanceof TransferDispatch) {
            onTransferDispatch(message.asTransferDispatch());
        } else if (message instanceof TransferConfirmation) {
            onTransferConfirmation(message.asTransferConfirmation(), session);
        } else if (message instanceof TerminationMessage) {
            session.remove();
            deleteSession(session);
        }
    }

    private void invalidateTransferCaches() {
        String[] cacheNames = {TransferEntity.QUERY_CACHE, TransferEntity.ENTITY_CACHE};
        for (val cacheName : cacheNames) {
            val cache = cacheManager.getCache(cacheName);
            if (cache != null) {
                cache.invalidate();
                log.debug("Cache '{}' was invalidated", cacheName);
            }
        }
    }

    private void clientExceptionHandler(@NonNull final Exception ex) {
        log.error("VASP Client error", ex);
    }

    private void onSessionRequest(
            @NonNull final SessionRequest message) {

        val vaspInfo = message.getVaspInfo();
        val vaspId = vaspInfo.getVaspId().getData();
        VaspInfoEntity vaspInfoEntity = vaspInfoService.findById(vaspId).orElse(null);
        if (vaspInfoEntity == null) {
            vaspInfoEntity = new VaspInfoEntity();
            vaspInfoEntity.setId(vaspId);
            vaspInfoEntity.setVaspCode(vaspInfo.getVaspCode());
            vaspInfoEntity.setName(vaspInfo.getName());
            vaspInfoEntity = vaspInfoService.save(vaspInfoEntity);
        }

        val transferEntity = transferService
                .findBySessionId(message.getHeader().getSessionId())
                .orElseGet(TransferEntity::new);

        transferEntity.setTrType(TransferType.INCOMING);
        transferEntity.setTrStatus(TransferStatus.SESSION_REQUESTED);
        transferEntity.setSessionId(message.getHeader().getSessionId());
        transferEntity.setCounterpartyVasp(vaspInfoEntity);
        transferEntity.setCreated(LocalDateTime.now());
        transferEntity.setUpdated(LocalDateTime.now());

        transferService.save(transferEntity);
    }

    private void onSessionReply(
            @NonNull final SessionReply message) {

        val responseCode = message.getResponseCode();
        transferService
                .findBySessionId(message.getHeader().getSessionId())
                .ifPresent(transferEntity -> {
                    if ("1".equals(responseCode)) {
                        transferEntity.setTrStatus(TransferStatus.SESSION_CONFIRMED);
                    } else {
                        transferEntity.setTrStatus(TransferStatus.SESSION_DECLINED);
                    }
                    transferEntity.setSessionReplyCode(Integer.valueOf(responseCode));
                    transferService.save(transferEntity);
                });
    }

    private void onTransferRequest(
            @NonNull final TransferRequest message) {

        transferService
                .findBySessionId(message.getHeader().getSessionId())
                .ifPresent(transferEntity -> {
                    transferEntity.setTrStatus(TransferStatus.TRANSFER_REQUESTED);
                    transferMapper.toEntity(message, transferEntity);
                    transferEntity.setOriginator(getCounterpartyEntity(message.getOriginator().getVaan()));
                    transferEntity.setBeneficiary(getCounterpartyEntity(message.getBeneficiary().getVaan()));
                    transferService.save(transferEntity);
                });
    }

    private void onTransferReply(
            @NonNull final TransferReply message) {

        val responseCode = message.getResponseCode();
        transferService
                .findBySessionId(message.getHeader().getSessionId())
                .ifPresent(transferEntity -> {
                    if ("1".equals(responseCode)) {
                        transferEntity.setTrStatus(TransferStatus.TRANSFER_ALLOWED);
                    } else {
                        transferEntity.setTrStatus(TransferStatus.TRANSFER_FORBIDDEN);
                    }
                    transferEntity.setTransferReplyCode(Integer.valueOf(responseCode));
                    transferService.save(transferEntity);
                });
    }

    private void onTransferDispatch(
            @NonNull final TransferDispatch message) {

        transferService
                .findBySessionId(message.getHeader().getSessionId())
                .ifPresent(transferEntity -> {
                    transferEntity.setTrStatus(TransferStatus.TRANSFER_DISPATCHED);
                    transferMapper.toEntity(message, transferEntity);
                    transferService.save(transferEntity);
                });
    }

    private void onTransferConfirmation(
            @NonNull final TransferConfirmation message,
            @NonNull final Session session) {

        val responseCode = message.getResponseCode();
        transferService
                .findBySessionId(message.getHeader().getSessionId())
                .ifPresent(transferEntity -> {
                    if ("1".equals(responseCode)) {
                        transferEntity.setTrStatus(TransferStatus.DISPATCH_CONFIRMED);
                    } else {
                        transferEntity.setTrStatus(TransferStatus.DISPATCH_DECLINED);
                    }
                    transferEntity.setDispatchReplyCode(Integer.valueOf(responseCode));
                    transferService.save(transferEntity);
                    val terminationMessage = new TerminationMessage();
                    terminationMessage.getHeader().setResponseCode("1");
                    session.sendMessage(terminationMessage);
                    session.remove();
                    deleteSession(session);
                });
    }

    private void checkTransferStatus(
            @NonNull final TransferEntity transferEntity,
            @NonNull final TransferStatus expectedStatus) {

        if (!expectedStatus.equals(transferEntity.getTrStatus())) {
            throw new HttpBadRequestException(
                    "Invalid state for Transfer with ID = %d. Expected %s but found %s",
                    transferEntity.getId(),
                    expectedStatus.name(),
                    transferEntity.getTrStatus().name());
        }
    }

    private void checkTransferType(
            @NonNull final TransferEntity transferEntity,
            @NonNull final TransferType expectedType) {

        if (!expectedType.equals(transferEntity.getTrType())) {
            throw new HttpBadRequestException(
                    "Invalid type for Transfer with ID = %d. Expected %s but found %s",
                    transferEntity.getId(),
                    expectedType.name(),
                    transferEntity.getTrType().name());
        }
    }

    private OriginatorSession getOriginatorSession(@NonNull final String sessionId) {
        return vaspInstance
                .getOriginatorSession(sessionId)
                .orElseThrow(() -> new HttpServiceException("VASP Client session(ID=%s) is not found", sessionId));
    }

    private BeneficiarySession getBeneficiarySession(@NonNull final String sessionId) {
        return vaspInstance
                .getBeneficiarySession(sessionId)
                .orElseThrow(() -> new HttpServiceException("VASP Client session(ID=%s) is not found", sessionId));
    }

    private CounterpartyEntity getCounterpartyEntity(@NonNull final Vaan vaan) {
        return counterpartyService
                .findByVaan(vaan)
                .orElseThrow(() -> new VaspException("CounterpartyEntity VAAN = {} is not found", vaan));
    }

    private void saveSession(@NonNull final Session session) {
        sessionStateService.saveState(session.getState());
    }

    private void deleteSession(@NonNull final Session session) {
        sessionStateService.delete(session.sessionId());
    }

}
