package org.openvasp.host.rest;

import lombok.SneakyThrows;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(profiles = "test")
@AutoConfigureJsonTesters
public class BaseControllerTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @SneakyThrows
    protected <T> T httpGet(Class<T> dtoClass, String path, Object... args) {
        val url = String.format("http://localhost:%d/api/v1", port) + path;
        val request = RequestEntity.get(null).header("Authorization", "Basic b3Zhc3A6MDctTWF5LTIwMjA=").build();
        val response = restTemplate.exchange(url, HttpMethod.GET, request, dtoClass, args);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        return response.getBody();
    }

}

