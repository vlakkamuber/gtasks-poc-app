import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { arrowBack, person, wallet, settings, logOut as logOutIcon, star, documentText, card, school, lockClosed, help, information, informationCircle } from "ionicons/icons";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import { useUserAuth } from "../context/UserAuthContext";
const Account: React.FC = () => {
  const { t } = useTranslation();
  const {logOut: firebaseLogOut} = useUserAuth();
  const logOut = async () => {
    await firebaseLogOut();
    history.push("/home");
    localStorage.clear();
    window.location.reload(true);
  }
  const history = useHistory();
  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  const goToReportBug = ()=>{
    history.push("/dashboard/issue");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
            {/* <IonButton onClick={goBack}>Back</IonButton> */}
          </IonButtons>
          <IonTitle className="ion-text-center">{t(`dcag.account.page.heading`)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{padding:'10px'}}>
        {/* <div className="ion-padding" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px'}}>
          <div style={{paddingLeft:'20px'}}>
          <h2>Evan Rob</h2>
          <IonBadge><IonIcon icon={star} style={{ fontSize: '1.2rem', color: 'white' }} /><span style={{fontSize:'1.2rem'}}>4.5</span></IonBadge>
          </div>

          <IonIcon icon={person} slot="start" style={{fontSize: '2rem'}}/>
        </div> */}

        <IonList style={{padding:'20px'}}>
          {/* <IonItem button className="no-border">
            <IonIcon icon={informationCircle} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.myaccount`)}</IonLabel>
          </IonItem>

          <IonItem button className="no-border">
          <IonIcon icon={documentText} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.documents`)}</IonLabel>
          </IonItem>

          <IonItem button className="no-border">
          <IonIcon icon={card} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.payments`)}</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
            <IonIcon icon={wallet} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.earnings`)}</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
          <IonIcon icon={lockClosed} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.SecurityPrivacy`)}</IonLabel>
          </IonItem>
          <IonItem button className="no-border">
          <IonIcon icon={settings} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.appSettings`)}</IonLabel>
          </IonItem> */}
          <IonItem button className="no-border clickable-cursor">
          <IonIcon icon={school} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.trainingmodule`)}</IonLabel>
          </IonItem>
          <IonItem button className="no-border clickable-cursor">
          <IonIcon icon={help} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.help`)}</IonLabel>
          </IonItem>
          <IonItem onClick={()=>goToReportBug()} button className="no-border clickable-cursor">
          <IonIcon icon={documentText} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.reportBug`)}</IonLabel>
          </IonItem>
          <IonItem button className="no-border clickable-cursor" onClick={logOut}>
          <IonIcon icon={logOutIcon} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.logout`)}</IonLabel>
          </IonItem>
          <IonItem>
          <IonLabel>App Language</IonLabel> <LanguageSwitcher/>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Account;
