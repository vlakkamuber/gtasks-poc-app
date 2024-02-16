# GCP
`gcloud config set project anz-driver-ops-ritu`
`gcloud config set run/region asia-south1`

## Cloud Run - Deploy
```
gcloud run deploy dcag-api-service --source ./dcag-api-service-java --platform managed --region asia-south1 --allow-unauthenticated --vpc-connector dcag-vpc-connector
```

## Gateway

### Create API Config
```
gcloud api-gateway api-configs create dcag-api-config-100 --api=dcag-api --openapi-spec=./dcag-api-service-java/openapi-run.yaml
```

### Update API Gateway with new config
```
gcloud api-gateway gateways update dcag-gateway --api=dcag-api --location=asia-northeast1 --api-config=dcag-api-config-100
```

### Test API Gateway
`curl https://dcag-gateway-cpypkzbg.an.gateway.dev/health`
`curl https://dcag-gateway-cpypkzbg.an.gateway.dev/users`

### Cloud storage allow cors 
`gcloud storage buckets update gs://dcag-tasks-output/ --cors-file=dcag_cloud_storage_cors_file.json`
`gcloud storage buckets update gs://dcag-tasks-input/ --cors-file=dcag_cloud_storage_cors_file.json`

- verify 
`gcloud storage buckets  describe gs://dcag-tasks-output/`
`gcloud storage buckets  describe gs://dcag-tasks-input/`

### Update metadata of output bucket 
```
nano setmeta.sh

for object in $(gsutil ls gs://dcag-tasks-output/audio/); do
    gsutil setmeta -h "Content-Type:audio/mpeg" "$object"
done

chmod +x setmeta.sh

./setmeta.sh
```


