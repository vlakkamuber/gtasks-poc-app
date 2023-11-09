import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import {Button, KIND,SHAPE} from 'baseui/button';
import {ArrowLeft,ArrowRight} from 'baseui/icon';

const Login = () => {
  const [phone, setPhone] = useState("");
  const history = useHistory();
  const countryOptions = [
    { value: "us", label: "United States", flag: "🇺🇸" },
    { value: "ca", label: "Canada", flag: "🇨🇦" },
    { value: "in", label: "India", flag: "🇮🇳", phoneCode: "+91" },
    // Add more countries as needed
  ];
  const [selectedCountry, setSelectedCountry] = useState({
    value: "in", label: "India", flag: "🇮🇳", phoneCode: "+91" 
  });

  const sendOtp = () => {
    localStorage.setItem("phone", phone);
    history.push("/otp");
  };

  return (
    <IonPage style={{ padding: "15px" }}>
      <IonContent>
        <label style={{ fontWeight: "600", fontSize: "1.4rem" }}>
          What's your mobile number?
        </label>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
          <IonSelect placeholder={selectedCountry.flag} className="country-select-box" value={selectedCountry.flag} style={{height:'5vh',minHeight:'unset',paddingeft: '9px'}}>
            {countryOptions.map(function (country) {
              return (
                <IonSelectOption value={country.value}>
                  {country.flag}
                </IonSelectOption>
              );
            })}
          </IonSelect>
          <input
            type="text"
            value={phone}
            className="phone-input"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <p style={{ padding: "10px" }}>
          <small>
            By proceeding, you consent to get calls, Whatsapp or SMS Email ID
            messages, including by automated means, from Uber and its affiliates
            to the number provided. 8686478524
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
          {/* <IonButton
            color="secondary"
            routerLink="/home"
            expand="block"
            className="prev-next-button"
          >
            <IonIcon slot="start" icon={arrowBack} />
          </IonButton>

          <IonButton
            color="secondary"
            onClick={() => sendOtp()}
            expand="block"
            className="prev-next-button"
          >
            Next <IonIcon slot="end" icon={arrowForward} />
          </IonButton> */}
          <Button shape={SHAPE.pill} kind={KIND.secondary} onClick={() => history.push("/home")}><ArrowLeft/></Button>
          <Button shape={SHAPE.pill} kind={KIND.secondary} onClick={() => sendOtp()} disabled={phone.length===0}>Next <ArrowRight/></Button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
