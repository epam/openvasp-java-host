package org.openvasp.host.model.jpa;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.openvasp.client.model.TransferRequest.VirtualAssetType;
import org.openvasp.host.model.TransferStatus;
import org.openvasp.host.model.TransferType;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Entity
@Table(name = "transfer")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@ToString(of = "id")
public class TransferEntity implements JpaEntity<Integer> {

    public static final String ENTITY_CACHE = "transfer-entities";
    public static final String QUERY_CACHE = "transfer-queries";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "tr_type")
    @Enumerated(EnumType.STRING)
    private TransferType trType;

    @Column(name = "tr_status")
    @Enumerated(EnumType.STRING)
    private TransferStatus trStatus;

    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "created")
    private LocalDateTime created;

    @Column(name = "updated")
    private LocalDateTime updated;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "asset_type")
    @Enumerated(EnumType.STRING)
    private VirtualAssetType assetType;

    @Column(name = "tx_hash")
    private String txHash;

    @Column(name = "tx_time")
    private ZonedDateTime txDateTime;

    @Column(name = "send_addr")
    private String sendAddr;

    @Column(name = "dest_addr")
    private String destAddr;

    @Column(name = "reply_code_1")
    private Integer sessionReplyCode;

    @Column(name = "reply_code_2")
    private Integer transferReplyCode;

    @Column(name = "reply_code_3")
    private Integer dispatchReplyCode;

    @ManyToOne
    @JoinColumn(name = "originator_id")
    private CounterpartyEntity originator;

    @ManyToOne
    @JoinColumn(name = "beneficiary_id")
    private CounterpartyEntity beneficiary;

    @ManyToOne
    @JoinColumn(name = "vasp_id")
    private VaspInfoEntity counterpartyVasp;

}
