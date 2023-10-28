
import React, { useState } from 'react';
import { IonInput, IonLabel, IonItem,IonButton,IonContent, IonPage, } from '@ionic/react';
import { star } from 'ionicons/icons';
// import {Selectable} from 'ionic-selectable';

// Define a function to fetch the list of countries
function fetchCountries() {
  // You can fetch countries data from an API or use a predefined list
  // For this example, let's use a predefined list
  return [
    { id: 'US', name: 'United States', dialCode: '+1' },
    { id: 'CA', name: 'Canada', dialCode: '+1' },
    // Add more countries as needed
  ];
}

const Login = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Handle the selection of a country
  // const handleCountryChange = (event) => {
  //   setSelectedCountry(event);
  // };

  return (
    <IonPage>
    <IonContent>
    <IonItem>
      <IonLabel position="stacked"><h1>What's your number?</h1></IonLabel>
      <IonInput type="tel" placeholder="Enter your phone number" />
      <div style={{ display: 'flex', justifyContent: 'space-between', width:'100%' }}>
      <IonButton routerLink="/otp" fill="clear">Previous</IonButton>
        <IonButton routerLink="/otp" fill="clear">Next</IonButton>
      </div>
     
    </IonItem>
    </IonContent>
    </IonPage>
  );
};

export default Login;
