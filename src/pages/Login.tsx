import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonIcon
} from "@ionic/react";
import {arrowBack,arrowForward } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [phone,setPhone] = useState("")
  const history = useHistory();

  const sendOtp = ()=>{
    localStorage.setItem("phone",phone)
    history.push("/otp")
  }

  return (
    <IonPage style={{padding:'15px'}}>
      <IonContent>
        <label style={{fontWeight:'600',fontSize:'1.5rem'}}>What's your mobile number?</label>
        <input type="text" value={phone} className="phone-input" onChange={(e)=>setPhone(e.target.value)}/>
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
          <IonButton color="secondary" routerLink="/home" expand="block" className="prev-next-button">
            <IonIcon slot="start" icon={arrowBack} />
          </IonButton>

          <IonButton color="secondary" onClick={()=>sendOtp()}  expand="block" className="prev-next-button">
            Next <IonIcon slot="end" icon={arrowForward} />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
