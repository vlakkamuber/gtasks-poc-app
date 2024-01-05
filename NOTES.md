# GCP
`gcloud config set project anz-driver-ops-ritu`
`gcloud config set run/region asia-south1`

## Cloud Run - Deploy
`cd dcag-api-service-java`
`gcloud run deploy dcag-api-service --source ./dcag-api-service-java --platform managed --region asia-south1 --allow-unauthenticated`

## Gateway

### Create API Gateway
`gcloud api-gateway gateways create dcag-gateway --api=dcag-api --api-config=dcag-api-config-cors --location=asia-northeast1`

### Create API Config
`gcloud api-gateway api-configs create dcag-api-config-cors-1 --api=dcag-api --openapi-spec=./dcag-api-service-java/openapi-run.yaml` 

### Update API Gateway with new config
`gcloud api-gateway gateways update dcag-gateway --api=dcag-api --api-config=dcag-api-config-cors --location=asia-northeast1`

### Test API Gateway
`curl https://dcag-gateway-6q2q4q2q4q-uc.a.run.app/health`
`curl https://dcag-gateway-6q2q4q2q4q-uc.a.run.app/users`
