package org.openvasp.host.rest;

import lombok.val;
import org.junit.jupiter.api.Test;
import org.openvasp.host.model.dto.TransferDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.json.JacksonTester;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Olexandr_Bilovol@epam.com
 */
public class TransferControllerTests extends BaseControllerTests {

    @Autowired
    private JacksonTester<TransferDto> transferJsonTester;

    @Test
    public void testFindById() throws Exception {
        val transfer1001 = httpGet(TransferDto.class, "/transfers/{id}", 1001);
        assertThat(transferJsonTester.write(transfer1001)).isEqualToJson("transfer_1001.json");

        val transfer1002 = httpGet(TransferDto.class, "/transfers/{id}", 1002);
        assertThat(transferJsonTester.write(transfer1002)).isEqualToJson("transfer_1002.json");
    }

}

