import React,{useEffect} from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonImg,
} from "@ionic/react";
import { ButtonDock } from "baseui/button-dock";
import { Button, KIND } from "baseui/button";
import {useHistory} from "react-router-dom"
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useEffect(()=>{
    fetch("https://dcag-gateway-cpypkzbg.an.gateway.dev/").then(function(res){
        console.log(res)
    })
  },[])
  return (
    <IonPage>
      <IonHeader>{/* Add header content if needed */}</IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonImg
            src="assets/home.png"
            alt="Image"
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* <div
          className="button-container"
          style={{ position: "absolute", bottom: "32px" }}
        >
          <IonButton
            expand="block"
            color="secondary"
            routerLink="/login"
            className="signup-login-button"
          >
            Sign up
          </IonButton>
          <IonButton
            expand="block"
            routerLink="/login"
            className="signup-login-button"
          >
            Sign in
          </IonButton>
        </div> */}
         <div
          className="button-container"
          style={{}}
        >
          <ButtonDock
          // secondaryActions={[
          //   <Button kind={KIND.secondary} key="first" onClick={()=>history.push("/signup")}>
          //     Sign up
          //   </Button>,
          // ]}
          primaryAction={<Button onClick={()=>history.push("/login")}>{t(`dcag.home.login.label`)}</Button>}
        />
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;
