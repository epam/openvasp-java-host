package org.openvasp.host;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@SpringBootTest
@ActiveProfiles(profiles = "test")
public class VaspHostAppTests {

    @Test
    void contextLoads() {
    }

}
