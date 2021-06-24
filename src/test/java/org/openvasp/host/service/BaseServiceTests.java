package org.openvasp.host.service;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@SpringBootTest
@ActiveProfiles(profiles = "test")
@Transactional
@Rollback
public class BaseServiceTests {
}
