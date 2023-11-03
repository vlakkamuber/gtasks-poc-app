import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButtons,
  IonIcon, } from '@ionic/react';

import './Tab1.css';
import { useHistory } from "react-router-dom";
import { arrowBack } from "ionicons/icons";
const Training: React.FC = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
            {/* <IonButton onClick={goBack}>Back</IonButton> */}
          </IonButtons>
          <IonTitle className="ion-text-center">Training</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <h1>Learning Center</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Training;
