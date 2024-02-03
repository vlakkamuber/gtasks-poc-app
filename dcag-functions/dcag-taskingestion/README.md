# dcag-taskingestion

## Run locally
```
mvn clean package
java -jar target/dcag-taskingestion-0.0.1-SNAPSHOT.jar
```

or run from IntelliJ

## Use
`curl http://localhost:8080/ -d "hello"`

## Deploy to GCP

#### Package the app
```
mvn package
```
You should see the fat jar in the target/deploy directory.

#### Run the following command to deploy.
```
gcloud functions deploy dcag-taskingestion-1  --entry-point org.springframework.cloud.function.adapter.gcp.GcfJarLauncher \
--runtime java17 \
--trigger-http \
--source target/deploy \
--memory 512MB \
--region asia-south1
```

#### Invoke the HTTP function:
```
curl https://REGION-PROJECT_ID.cloudfunctions.net/dcag-taskingestion-1 -d "hello"
```

## References
https://docs.spring.io/spring-cloud-function/reference/adapters/gcp-intro.html
