package org.openvasp.host.repo;

import lombok.val;
import org.junit.jupiter.api.Test;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.CounterpartyRole;
import org.openvasp.host.model.CounterpartyType;
import org.openvasp.host.model.jpa.CounterpartyEntity;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.openvasp.host.model.Assertions.assertThat;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public class CounterpartyRepoTests extends BaseRepoTests {

    @Autowired
    private CounterpartyRepo counterpartyRepo;

    @Test
    public void testFindAll() {
        val counterparties = counterpartyRepo.findAll();
        assertThat(counterparties).hasSize(6);

        val counterparty0 = counterparties.get(0);
        assertThat(counterparty0)
                .hasId(1001)
                .hasRole(CounterpartyRole.ORIGINATOR)
                .hasType(CounterpartyType.NATURAL_PERSON)
                .hasVaan(new Vaan("7dface6100000000000001a7"))
                .hasName("Person-1");

        val counterparty1 = counterparties.get(1);
        assertThat(counterparty1)
                .hasId(1002)
                .hasRole(CounterpartyRole.ORIGINATOR)
                .hasType(CounterpartyType.JURIDICAL_PERSON)
                .hasVaan(new Vaan("7dface6100000000000002a8"))
                .hasName("Company-1");
    }

    @Test
    public void testFindByVaan() {
        val counterparty0 = counterpartyRepo.findByVaan(new Vaan("7dface6100000000000003a9"));
        assertThat(counterparty0).isNotEmpty();
        assertThat(counterparty0).map(CounterpartyEntity::getId).hasValue(1003);

        val counterparty1 = counterpartyRepo.findByVaan(new Vaan("bbb4ee5c00000000000007c0"));
        assertThat(counterparty1).isNotEmpty();
        assertThat(counterparty1).map(CounterpartyEntity::getId).hasValue(1006);
    }

}
