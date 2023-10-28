import React, { useState, useRef } from "react";
import {
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonContent,
  IonPage,
} from "@ionic/react";
import "./Tab2.css";

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
    <IonPage>
      <IonContent>
        <h2>Enter the OTP:</h2>
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
        {/* Add a button to submit the OTP and handle the verification logic */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IonButton routerLink="/login" fill="clear">
            Previous
          </IonButton>
          <IonButton routerLink="/dashboard" fill="clear">
            Next
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OTP;
