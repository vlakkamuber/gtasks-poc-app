# dcag-ui

## Run locally
````
npm install
ionic build
ionic serve
````

## Deploy to firebase hosting
### Prerequisites
````
npm install -g firebase-tools
firebase login
firebase use anz-driver-ops-ritu
````

### Build and deploy
````
ionic build --prod
firebase deploy --project anz-driver-ops-ritu
