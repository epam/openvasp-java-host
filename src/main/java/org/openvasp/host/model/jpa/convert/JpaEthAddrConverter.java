package org.openvasp.host.model.jpa.convert;

import org.openvasp.client.model.EthAddr;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Converter
public class JpaEthAddrConverter implements AttributeConverter<EthAddr, String> {

    @Override
    public String convertToDatabaseColumn(final EthAddr attribute) {
        return attribute == null ? null : attribute.getData();
    }

    @Override
    public EthAddr convertToEntityAttribute(final String dbData) {
        return dbData == null ? null : new EthAddr(dbData);
    }

}
