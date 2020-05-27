package org.openvasp.host;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@SpringBootApplication
@EnableCaching
public class VaspHostApp {

    public static void main(String[] args) {
        SpringApplication.run(VaspHostApp.class, args);
    }

}
