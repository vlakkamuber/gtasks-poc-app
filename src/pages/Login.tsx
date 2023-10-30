import React, { useState } from "react";
import {
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
  IonIcon
} from "@ionic/react";
import { star,arrowBack,arrowForward } from "ionicons/icons";
// import {Selectable} from 'ionic-selectable';

// Define a function to fetch the list of countries
function fetchCountries() {
  // You can fetch countries data from an API or use a predefined list
  // For this example, let's use a predefined list
  return [
    { id: "US", name: "United States", dialCode: "+1" },
    { id: "CA", name: "Canada", dialCode: "+1" },
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
        <IonHeader>{/* Add header content if needed */}</IonHeader>
        <IonItem>
          <IonLabel position="stacked">
            <h1>What's your number?</h1>
          </IonLabel>
          <IonInput type="tel" placeholder="Enter your phone number" />
        </IonItem>
        <p style={{ padding: "10px" }}>
          <small>
            By proceeding, you consent to get calls, Whatsapp or SMS Email ID
            messages, including by automated means, from Uber and its affiliates
            to the number provided. abc@gmail.com
          </small>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <IonButton color="secondary" routerLink="/" expand="full">
            <IonIcon slot="start" icon={arrowBack} />
          </IonButton>

          <IonButton color="secondary" routerLink="/otp" expand="full">
            Next <IonIcon slot="end" icon={arrowForward} />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
