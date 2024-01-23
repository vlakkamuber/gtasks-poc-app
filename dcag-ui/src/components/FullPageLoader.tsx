import React from 'react';
import { IonContent, IonHeader, IonPage, IonSpinner } from '@ionic/react';

const FullPageLoader = () => (
  <IonPage>
    <IonHeader></IonHeader>
    <IonContent>
      <IonSpinner name="circular"></IonSpinner>
    </IonContent>
  </IonPage>
);

export default FullPageLoader;
