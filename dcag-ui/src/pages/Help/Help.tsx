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
  IonListHeader
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { arrowBack, chatbox, call, list } from 'ionicons/icons';
const Help: React.FC = () => {
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
          <IonTitle>Help</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ '--padding': '10px', '--background': '#f3f3f3' }}>
        <div>
          <IonList>
            <IonListHeader style={{ background: '#f3f3f3' }}>
              <IonLabel style={{ fontSize: '1.35rem', fontWeight: '700' }}>Support center</IonLabel>
            </IonListHeader>
            <IonItem style={{ fontSize: '1rem', fontWeight: '500', padding: '13px' }}>
              <IonLabel>
                {' '}
                <IonIcon icon={chatbox} slot="start" style={{ marginRight: '14px' }} />
                Chat with us
              </IonLabel>
            </IonItem>
            <IonItem style={{ fontSize: '1rem', fontWeight: '500', padding: '13px' }}>
              <IonLabel>
                {' '}
                <IonIcon icon={call} slot="start" style={{ marginRight: '14px' }} />
                Call support
              </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
            <IonListHeader style={{ background: '#f3f3f3' }}>
              <IonLabel style={{ fontSize: '1.35rem', fontWeight: '700' }}>
                Suggested topics
              </IonLabel>
            </IonListHeader>
            <IonItem style={{ fontSize: '1rem', fontWeight: '500', padding: '13px' }}>
              <IonLabel>
                <IonIcon icon={list} slot="start" style={{ marginRight: '14px' }} />
                Audio recording is not working
              </IonLabel>
            </IonItem>
            <IonItem style={{ fontSize: '1rem', fontWeight: '500', padding: '13px' }}>
              <IonLabel>
                <IonIcon icon={list} slot="start" style={{ marginRight: '14px' }} />
                Text script is inappropriate
              </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
            <IonListHeader style={{ background: '#f3f3f3' }}>
              <IonLabel style={{ fontSize: '1.35rem', fontWeight: '700' }}>
                Learning center
              </IonLabel>
            </IonListHeader>
            <IonItem style={{ fontSize: '1rem', fontWeight: '500', padding: '13px' }}>
              <IonLabel>
                <IonIcon icon={list} slot="start" style={{ marginRight: '14px' }} />
                Training modules
              </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
            <IonListHeader style={{ background: '#f3f3f3' }}>
              <IonLabel style={{ fontSize: '1.35rem', fontWeight: '700' }}>All topics</IonLabel>
            </IonListHeader>
            <IonItem style={{ fontSize: '1rem', fontWeight: '500', padding: '13px' }}>
              <IonLabel>
                <IonIcon icon={list} slot="start" style={{ marginRight: '14px' }} />
                Account and app issues
              </IonLabel>
            </IonItem>
            <IonItem style={{ fontSize: '1rem', fontWeight: '500', padding: '13px' }}>
              <IonLabel>
                <IonIcon icon={list} slot="start" style={{ marginRight: '14px' }} />
                Training videos is abandoned
              </IonLabel>
            </IonItem>
            <IonItem style={{ fontSize: '1rem', fontWeight: '500', padding: '13px' }}>
              <IonLabel>
                <IonIcon icon={list} slot="start" style={{ marginRight: '14px' }} />
                Payment statement is incorrect
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Help;
