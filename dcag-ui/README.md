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
firebase deploy --only hosting:staging-anz-driver-ops-ritu --project anz-driver-ops-ritu
firebase deploy --only hosting:anz-driver-ops-ritu --project anz-driver-ops-ritu
````
### Build APK
OPEN  vi ~/.gradle/init.gradle file then add below line
maven { url "http://artifactory.uber.internal:4587/artifactory/repo/";  allowInsecureProtocol = true}

go to root of your project dcag-ui>  then perform following
rm -rf ./android
npx cap add android
npx cap copy
npx cap open android
then from android studio----click on build apk ----
then apk will be generated in android---app---build---outputs---apk---debug---app.debug.apk
