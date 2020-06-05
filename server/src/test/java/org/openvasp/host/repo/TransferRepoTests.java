package org.openvasp.host.repo;

import lombok.val;
import org.junit.jupiter.api.Test;
import org.openvasp.host.model.TransferType;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.openvasp.host.model.Assertions.assertThat;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public class TransferRepoTests extends BaseRepoTests {

    @Autowired
    private TransferRepo transferRepo;

    @Test
    public void testFindAll() {
        val transfers = transferRepo.findAll();
        assertThat(transfers).hasSize(7);

        val transfer0 = transfers.get(0);
        assertThat(transfer0)
                .hasId(1001)
                .hasTrType(TransferType.INCOMING);


        val transfer1 = transfers.get(1);
        assertThat(transfer1)
                .hasId(1002)
                .hasTrType(TransferType.OUTGOING);
    }

}
