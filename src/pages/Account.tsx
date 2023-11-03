import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonIcon,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { useHistory } from "react-router-dom";
import { arrowBack, person, settings, logOut } from "ionicons/icons";
const Account: React.FC = () => {
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
          <IonTitle className="ion-text-center">Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h2>Evan Rob</h2>
        </div>

        <IonList style={{padding:'20px'}}>
          <IonItem button className="no-border">
            <IonIcon icon={person} slot="start" />
            <IonLabel>My Account</IonLabel>
          </IonItem>

          <IonItem button className="no-border">
            <IonIcon icon={settings} slot="start" />
            <IonLabel>Documents</IonLabel>
          </IonItem>

          <IonItem button className="no-border">
            <IonIcon icon={logOut} slot="start" />
            <IonLabel>Payments</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
            <IonIcon icon={logOut} slot="start" />
            <IonLabel>Earnings</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
            <IonIcon icon={logOut} slot="start" />
            <IonLabel>Security and privacy</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
            <IonIcon icon={logOut} slot="start" />
            <IonLabel>App settings</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
            <IonIcon icon={logOut} slot="start" />
            <IonLabel>Trainings modules</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
            <IonIcon icon={logOut} slot="start" />
            <IonLabel>Help</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Account;
