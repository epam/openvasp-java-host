package org.openvasp.host.model.jpa.convert;

import org.openvasp.client.model.VaspCode;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Converter
public class JpaVaspCodeConverter implements AttributeConverter<VaspCode, String> {

    @Override
    public String convertToDatabaseColumn(final VaspCode attribute) {
        return attribute == null ? null : attribute.getData();
    }

    @Override
    public VaspCode convertToEntityAttribute(final String dbData) {
        return dbData == null ? null : new VaspCode(dbData);
    }

}
