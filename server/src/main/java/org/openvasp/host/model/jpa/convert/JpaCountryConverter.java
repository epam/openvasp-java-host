package org.openvasp.host.model.jpa.convert;

import org.openvasp.client.model.Country;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Converter
public class JpaCountryConverter implements AttributeConverter<Country, String> {

    @Override
    public String convertToDatabaseColumn(final Country attribute) {
        return attribute == null ? null : attribute.getCode();
    }

    @Override
    public Country convertToEntityAttribute(final String dbData) {
        return dbData == null ? null : Country.fromCode(dbData);
    }

}
