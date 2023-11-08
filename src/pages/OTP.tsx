import React, { useState, useRef } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import {arrowBack,arrowForward } from "ionicons/icons";
import {Button, KIND,SHAPE} from 'baseui/button';
import {ArrowLeft,ArrowRight} from 'baseui/icon';
import {Block} from 'baseui/block';
import { useHistory } from "react-router";
const OTP: React.FC = () => {
  const history = useHistory()
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
        {/* <IonButton color="secondary" style={{marginTop:'20px'}} className="capitalize">
            Resend
          </IonButton> */}
          <Block marginBottom="scale300" />
           <Button kind={KIND.secondary} shape={SHAPE.pill}>Resend</Button>
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
          {/* <IonButton color="secondary" routerLink="/login" >
            <IonIcon slot="start" icon={arrowBack} />
          </IonButton>

          <IonButton color="primary" routerLink="/login-success">
            Next <IonIcon slot="end" icon={arrowForward} />
          </IonButton> */}
           <Button shape={SHAPE.pill} kind={KIND.secondary} onClick={() => history.push("/home")}><ArrowLeft/></Button>
          <Button shape={SHAPE.pill} kind={KIND.secondary} onClick={() => history.push("/login-success")}>Next <ArrowRight/></Button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OTP;
