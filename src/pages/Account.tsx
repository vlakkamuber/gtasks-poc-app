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
  IonBadge,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { useHistory } from "react-router-dom";
import { arrowBack, person, settings, logOut, star, documentText, card, school, lockClosed, help, information, informationCircle } from "ionicons/icons";
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
      <IonContent style={{padding:'10px'}}>
        <div className="ion-padding" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px'}}>
          <div style={{paddingLeft:'20px'}}>
          <h2>Evan Rob</h2>
          <IonBadge><IonIcon icon={star} style={{ fontSize: '1.2rem', color: 'white' }} /><span style={{fontSize:'1.2rem'}}>4.5</span></IonBadge>
          </div>
          
          <IonIcon icon={person} slot="start" style={{fontSize: '2rem'}}/>
        </div>

        <IonList style={{padding:'20px'}}>
          <IonItem button className="no-border">
            <IonIcon icon={informationCircle} slot="start" />
            <IonLabel>My Account</IonLabel>
          </IonItem>

          <IonItem button className="no-border">
          <IonIcon icon={documentText} slot="start" />
            <IonLabel>Documents</IonLabel>
          </IonItem>

          <IonItem button className="no-border">
          <IonIcon icon={card} slot="start" />
            <IonLabel>Payments</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
            <IonIcon icon={logOut} slot="start" />
            <IonLabel>Earnings</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
          <IonIcon icon={lockClosed} slot="start" />
            <IonLabel>Security and privacy</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
          <IonIcon icon={settings} slot="start" />
            <IonLabel>App settings</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
          <IonIcon icon={school} slot="start" />
            <IonLabel>Trainings modules</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
          <IonIcon icon={help} slot="start" />
            <IonLabel>Help</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Account;
