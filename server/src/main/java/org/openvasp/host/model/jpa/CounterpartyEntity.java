package org.openvasp.host.model.jpa;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.CounterpartyType;
import org.openvasp.host.model.jpa.convert.JpaVaanConverter;

import javax.persistence.*;
import java.util.Set;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Entity
@Table(name = "counterparty")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@ToString(of = {"id", "name"})
public class CounterpartyEntity implements JpaEntity<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "cp_type")
    @Enumerated(EnumType.STRING)
    private CounterpartyType type;

    @Column(name = "vaan")
    @Convert(converter = JpaVaanConverter.class)
    private Vaan vaan;

    @Column(name = "name")
    private String name;

    @Column(name = "bic")
    private String bic;

    @Embedded
    private BirthInfoEntity birth;

    @Embedded
    private PostalAddressEntity postalAddress;

    @ElementCollection
    @CollectionTable(
            name = "nat_id",
            joinColumns = @JoinColumn(name = "counterparty_id"))
    private Set<NatIdEntity> natIds;

    @ElementCollection
    @CollectionTable(
            name = "jur_id",
            joinColumns = @JoinColumn(name = "counterparty_id"))
    private Set<JurIdEntity> jurIds;

}
