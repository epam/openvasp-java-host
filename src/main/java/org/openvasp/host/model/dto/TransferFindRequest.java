package org.openvasp.host.model.dto;

import com.google.common.base.MoreObjects;
import lombok.Getter;
import lombok.Setter;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.TransferStatus;
import org.openvasp.host.model.TransferType;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Getter
@Setter
public class TransferFindRequest {

    @PositiveOrZero
    private Integer pageNr;

    @PositiveOrZero
    private Integer pageSize;

    private SortField sort;

    @Pattern(regexp = "(asc|desc)")
    private String direction;

    private TransferType trType;

    private TransferStatus trStatus;

    private String sessionId;

    private String originatorName;

    private String originatorVaan;

    private String beneficiaryName;

    private String beneficiaryVaan;

    @Override
    public String toString() {
        val result = new ToStringBuilder(this, ToStringStyle.JSON_STYLE);

        if (pageNr != null) {
            result.append("pageNr", pageNr);
        }

        if (pageSize != null) {
            result.append("pageSize", pageSize);
        }

        if (sort != null) {
            result.append("sort", sort.name());
        }

        if (!StringUtils.isEmpty(direction)) {
            result.append("direction", direction);
        }

        if (trType != null) {
            result.append("trType", trType.name());
        }

        if (trStatus != null) {
            result.append("trStatus", trStatus.name());
        }

        if (!StringUtils.isEmpty(sessionId)) {
            result.append("sessionId", sessionId);
        }

        if (!StringUtils.isEmpty(originatorName)) {
            result.append("originatorName", originatorName);
        }

        if (!StringUtils.isEmpty(beneficiaryName)) {
            result.append("beneficiaryName", beneficiaryName);
        }

        if (!StringUtils.isEmpty(originatorVaan)) {
            result.append("originatorVaan", originatorVaan);
        }

        if (!StringUtils.isEmpty(beneficiaryVaan)) {
            result.append("beneficiaryVaan", beneficiaryVaan);
        }

        return result.toString();
    }

    public Integer pageNr() {
        return Math.abs(MoreObjects.firstNonNull(pageNr, 0));
    }

    public Integer pageSize() {
        Integer result = MoreObjects.firstNonNull(pageSize, 500);
        if (result <= 0) {
            result = Integer.MAX_VALUE;
        }
        return result;
    }

    public SortField sort() {
        return MoreObjects.firstNonNull(sort, SortField.ID);
    }

    public String direction() {
        return MoreObjects.firstNonNull(direction, "asc");
    }

    public Vaan originatorVaan() {
        return new Vaan(originatorVaan);
    }

    public Vaan beneficiaryVaan() {
        return new Vaan(beneficiaryVaan);
    }

    public enum SortField {

        ID("id"),
        TR_TYPE("trType"),
        TR_STATUS("trStatus"),
        SESSION_ID("sessionId");

        public final String entityField;

        SortField(final String entityField) {
            this.entityField = entityField;
        }

    }

}
