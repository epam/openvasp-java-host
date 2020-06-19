package org.openvasp.host.service.impl;

import lombok.NonNull;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.openvasp.client.model.Beneficiary;
import org.openvasp.client.model.Originator;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.CounterpartyRole;
import org.openvasp.host.model.CounterpartyType;
import org.openvasp.host.model.jpa.*;
import org.openvasp.host.repo.CounterpartyRepo;
import org.openvasp.host.service.CounterpartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.HashSet;
import java.util.Optional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Service
public class CounterparyServiceImpl
        extends BaseJpaServiceImpl<Integer, CounterpartyEntity, CounterpartyRepo>
        implements CounterpartyService {

    @Autowired
    public CounterparyServiceImpl(final CounterpartyRepo repo) {
        super(CounterpartyEntity.class, repo);
    }

    @Override
    public Optional<CounterpartyEntity> findByVaan(@NonNull final Vaan vaan) {
        return repo.findByVaan(vaan);
    }

    @Override
    public CounterpartyEntity saveIncomingOriginator(@NonNull final Originator originator) {
        val result = new CounterpartyEntity();

        // An incoming originator becomes a beneficiary regarding to incoming transfers
        result.setRole(CounterpartyRole.BENEFICIARY);

        result.setVaan(originator.getVaan());
        result.setName(originator.getName());

        val postalAddressEntity = new PostalAddressEntity();
        result.setPostalAddress(postalAddressEntity);
        val postalAddress = originator.getAddress();
        if (postalAddress != null) {
            postalAddressEntity.setAdrline(postalAddress.getAdrline());
            postalAddressEntity.setNumber(postalAddress.getNumber());
            postalAddressEntity.setStreet(postalAddress.getStreet());
            postalAddressEntity.setPostCode(postalAddress.getPostCode());
            postalAddressEntity.setTown(postalAddress.getTown());
            postalAddressEntity.setCountry(postalAddress.getCountry());
        }

        if (StringUtils.isNotEmpty(originator.getBic())) {
            result.setType(CounterpartyType.BANK);
            result.setBic(originator.getBic());
        } else if (!CollectionUtils.isEmpty(originator.getJur())) {
            result.setType(CounterpartyType.JURIDICAL_PERSON);
            result.setJurIds(new HashSet<>());
            for (val jur : originator.getJur()) {
                val jurIdEntity = new JurIdEntity();
                jurIdEntity.setIdType(jur.getJurIdType());
                jurIdEntity.setIdStr(jur.getJurId());
                jurIdEntity.setIssuer(jur.getJurIdIssuer());
                jurIdEntity.setCountry(jur.getJurIdCountry());
                result.getJurIds().add(jurIdEntity);
            }
        } else {
            result.setType(CounterpartyType.NATURAL_PERSON);
            val birthInfoEntity = new BirthInfoEntity();
            result.setBirth(birthInfoEntity);
            if (originator.getBirth() != null) {
                birthInfoEntity.setBirthDate(originator.getBirth().getBirthDate());
                birthInfoEntity.setBirthTown(originator.getBirth().getBirthCity());
                birthInfoEntity.setBirthCountry(originator.getBirth().getBirthCountry());
            }
            result.setNatIds(new HashSet<>());
            if (!CollectionUtils.isEmpty(originator.getNat())) {
                for (val nat : originator.getNat()) {
                    val natIdEntity = new NatIdEntity();
                    natIdEntity.setIdType(nat.getNatIdType());
                    natIdEntity.setIdStr(nat.getNatId());
                    natIdEntity.setIssuer(nat.getNatIdIssuer());
                    natIdEntity.setCountry(nat.getNatIdCountry());
                    result.getNatIds().add(natIdEntity);
                }
            }
        }

        return save(result);
    }

    @Override
    public CounterpartyEntity saveIncomingBeneficiary(@NonNull final Beneficiary originator) {
        val result = new CounterpartyEntity();

        // An incoming beneficiary becomes an originator regarding to incoming transfers
        result.setRole(CounterpartyRole.BENEFICIARY);

        result.setRole(CounterpartyRole.ORIGINATOR);
        result.setType(CounterpartyType.NATURAL_PERSON);
        result.setVaan(originator.getVaan());
        result.setName(originator.getName());
        return save(result);
    }

}
