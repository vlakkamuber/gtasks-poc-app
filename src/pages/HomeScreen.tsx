import React from 'react';
import { IonContent, IonHeader, IonPage, IonButton, IonImg } from '@ionic/react';

const HomeScreen = () => {
  return (
    <IonPage>
      <IonHeader>
        {/* Add header content if needed */}
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonImg src="../../public/assets/text_to_image.png" alt="Image" />
        </div>
        <div className="button-container">
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
