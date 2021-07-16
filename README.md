# openvasp-java-host

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/OpenVASP/openvasp-java-host)

This is a companion application to demo the `openvasp-java-client` implementation.
See <https://github.com/OpenVASP/openvasp-java-client> for more information.

## Pre-requirements

- **Docker**. The OpenVASP Host depends on a couple of external services, *i.e.*, MySQL and Waku. Docker and Docker Compose are used to spin these services more easily.
- **JDK 8+**. To compile and execute the OpenVASP Spring-Boot demo application.
- **curl** *(Optional)*. To test API calls.

## Folder structure

```Project
+-- config
|  |  
|  +-- dump  <-- mysql dumps from test environment. All SQLs will be ingested automatically when docker compose is up
|  +-- waku  <-- basic configs for status node spin up
|
+-- src
|  |  
|  +-- main <-- host backend codebase
|  +-- test <-- host backend unit tests
|
+-- app.sh
+-- docker-compose.yml
```

## How to spin up

Compile and package the Spring Boot application

```sh
mvn package -DskipTests
```

`skipTests` is needed because currently they failed.

this creates `target/host-<pom-version>.jar` file that contains the Spring Boot application.

```bash
sh app.sh

java -Dspring.profiles.active=local,caffeine -jar ./target/host-<pom-version>.jar --openvasp.host.config=local --server.port=8080
```

or alternatively run

```sh
docker-compose up --detach
```

```sh
mvn spring-boot:run
```

## Testing

```bash
curl -H 'Authorization: Basic b3Zhc3A6MDctTWF5LTIwMjA=' http://localhost:8080/api/v1/counterparties/all
```

## Details

### (Add MySQL details)

Spin up DB (h2 / mysql)

### Waku/`statusd`

Use the following to spin up the Waku node/`statusd`

```sh
docker run --rm \                                                                                      <<<
    -p 8545:8545 \
    -p 30303:30303 \
    -v $(pwd)/waku.json:/waku.json \
    statusteam/status-go \
    -register \
    -log DEBUG \
    -c /waku.json
```

### Pipeline in Jenkins

<https://jenkins.getopenvasp.com/>

## Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
