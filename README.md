# openvasp-java-host

##Pre-requirements:
* Docker
* JDK 8+
* curl

##Folder structure:

```Project
+-- config
|  |  
|  +-- dump  <-- mysql dumps from test environment. All sqls will be ingested automatically when docker compose is up
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

## How to spin up:
```bash
sh app.sh

java -Dspring.profiles.active=local,caffeine -jar ./target/host-0.0.2.jar --openvasp.host.config=local --server.port=8080
```

##Testing:
```bash
curl -H 'Authorization: Basic b3Zhc3A6MDctTWF5LTIwMjA=' http://localhost:8080/api/v1/counterparties/all
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.