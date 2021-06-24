package org.openvasp.host.model.jpa.convert;

import org.openvasp.client.model.Vaan;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Converter
public class JpaVaanConverter implements AttributeConverter<Vaan, String> {

    @Override
    public String convertToDatabaseColumn(final Vaan attribute) {
        return attribute == null ? null : attribute.getData();
    }

    @Override
    public Vaan convertToEntityAttribute(final String dbData) {
        return dbData == null ? null : new Vaan(dbData);
    }

}
