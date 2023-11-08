import React from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonImg } from '@ionic/react';

const HomeScreen = () => {
  return (
    <IonPage>
      <IonHeader>
        {/* Add header content if needed */}
      </IonHeader>
      <IonContent>
        <div className="ion-padding" style={{height:'40vh'}}>
          <IonImg src="../../public/assets/home.png" alt="Image" style={{objectFit:'cover'}}/>
        </div>
        <div className="button-container" style={{position: 'absolute',bottom: '32px'}}>
          <IonButton expand="block"  color="secondary" routerLink="/login" className='signup-login-button'>
            Sign Up
          </IonButton>
          <IonButton expand="block" routerLink="/login" className='signup-login-button'>
            Sign In
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;
