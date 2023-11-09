import React from "react";
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

const HomeScreen = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>{/* Add header content if needed */}</IonHeader>
      <IonContent>
        <div className="ion-padding" style={{ height: "40vh" }}>
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
          style={{ position: "absolute", bottom: "32px" }}
        >
          <ButtonDock
          secondaryActions={[
            <Button kind={KIND.secondary} key="first" onClick={()=>history.push("/signup")}>
              Sign up
            </Button>,
          ]}
          primaryAction={<Button onClick={()=>history.push("/login")}>Sign in</Button>}
        />
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;
