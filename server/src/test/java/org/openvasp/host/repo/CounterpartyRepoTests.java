package org.openvasp.host.repo;

import lombok.val;
import org.junit.jupiter.api.Test;
import org.openvasp.client.model.Vaan;
import org.openvasp.host.model.CounterpartyType;
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
                .hasType(CounterpartyType.ORIGINATOR)
                .hasVaan(new Vaan("7dface6100000000000001a7"))
                .hasName("John Smith");

        val counterparty1 = counterparties.get(1);
        assertThat(counterparty1)
                .hasId(1002)
                .hasType(CounterpartyType.ORIGINATOR)
                .hasVaan(new Vaan("7dface6100000000000002a8"))
                .hasName("Eva Braun");
    }

}
