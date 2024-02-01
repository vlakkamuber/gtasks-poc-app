import React from 'react';
import {
  IonContent,
  IonLabel,
  IonRow,
  IonButton,
  IonGrid
} from '@ionic/react';

interface ErrorViewProps {
  message?: string;
  subText?: string;
}

export default function ErrorView({
  message = 'Something went wrong',
  subText = 'Please retry after sometime'
}: ErrorViewProps): React.ReactNode {
  return (
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
          <IonLabel>
            <h1>{message}</h1>
          </IonLabel>
        </IonRow>
        <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
          <IonLabel>
            <h2>{subText}</h2>
          </IonLabel>
        </IonRow>
        <IonRow
          className="ion-padding"
          style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <IonButton
            onClick={() => {
              window.location.reload();
            }}>
            Reload
          </IonButton>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
