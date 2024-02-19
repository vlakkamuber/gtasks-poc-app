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
  IonBadge
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  arrowBack,
  person,
  wallet,
  settings,
  logOut as logOutIcon,
  star,
  documentText,
  card,
  school,
  lockClosed,
  help,
  warningSharp
} from 'ionicons/icons';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useUserAuth } from '../context/UserAuthContext';
import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE } from '../constants/constant';
import { useEffect } from 'react';
const Account: React.FC = () => {
  const { t } = useTranslation();
  const { logOut: firebaseLogOut } = useUserAuth();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.account });
  useEffect(() => {
    logEvent({ actions: '' });
  }, []);
  const logOut = async () => {
    logEvent({ actions: 'click_logout' });
    await firebaseLogOut();
    history.push('/home');
    localStorage.clear();
    window.location.reload(true);
  };
  const history = useHistory();
  const goBack = () => {
    logEvent({ actions: 'click_go_back' });
    history.goBack(); // This function navigates back to the previous page
  };
  const goToReportBug = () => {
    logEvent({ actions: 'click_report_bug' });
    history.push('/dashboard/issue');
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
            {/* <IonButton onClick={goBack}>Back</IonButton> */}
          </IonButtons>
          <div style={{ display: 'flex', padding: '8px', justifyContent: 'end' }}>
            <IonTitle style={{ width: '80%' }}>{t(`dcag.account.page.heading`)}</IonTitle>
            <div style={{ width: '40%' }}>
              <LanguageSwitcher />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ padding: '10px' }}>
        {/* <div className="ion-padding" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px'}}>
          <div style={{paddingLeft:'20px'}}>
          <h2>Evan Rob</h2>
          <IonBadge><IonIcon icon={star} style={{ fontSize: '1.2rem', color: 'white' }} /><span style={{fontSize:'1.2rem'}}>4.5</span></IonBadge>
          </div>

          <IonIcon icon={person} slot="start" style={{fontSize: '2rem'}}/>
        </div> */}

        <IonList style={{ padding: '20px' }}>
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
          <IonItem
            button
            className="no-border clickable-cursor"
            routerLink="/dashboard/training"
            onClick={() => {
              logEvent({ actions: 'click_training_modules' });
            }}>
            <IonIcon icon={school} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.trainingmodule`)}</IonLabel>
          </IonItem>
          <IonItem button className="no-border clickable-cursor" disabled={true}>
            <IonIcon icon={help} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.help`)}</IonLabel>
          </IonItem>
          <IonItem onClick={() => goToReportBug()} button className="no-border clickable-cursor">
            <IonIcon icon={warningSharp} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.reportBug`)}</IonLabel>
          </IonItem>
          <IonItem button className="no-border clickable-cursor" onClick={logOut}>
            <IonIcon icon={logOutIcon} slot="start" />
            <IonLabel>{t(`dcag.account.page.link.logout`)}</IonLabel>
          </IonItem>
          {/* The below commented code should not be deleted.
          It may be uncommented and used in future when we remove the language switcher from the header */}
          {/* <IonItem>
            <IonLabel>App Language</IonLabel> <LanguageSwitcher />
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Account;
