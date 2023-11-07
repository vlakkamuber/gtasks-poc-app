import React, { useState, useRef } from "react";
import {
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import "./Tab2.css";
import { star,arrowBack,arrowForward } from "ionicons/icons";

const OTP: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleInputChange = (e, index) => {
    if (e.target.value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);
  };
  return (
    <IonPage style={{padding:'15px'}}>
      <IonContent>
        <p>Enter the 6 digit code sent you at:</p>
        <p>8686478524</p>
        <div className="otp-input">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              maxLength={1}
            />
          ))}
        </div>
        <IonButton color="secondary" style={{marginTop:'20px'}} className="capitalize">
            Resend
          </IonButton>
        {/* Add a button to submit the OTP and handle the verification logic */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <IonButton color="secondary" routerLink="/login" >
            <IonIcon slot="start" icon={arrowBack} />
          </IonButton>

          <IonButton color="primary" routerLink="/login-success">
            Next <IonIcon slot="end" icon={arrowForward} />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OTP;
