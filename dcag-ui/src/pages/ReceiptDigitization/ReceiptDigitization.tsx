import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonButton,
  IonInput,
  IonImg,
  IonToast,
  IonList,
  IonItem
} from '@ionic/react';
import LoadingComponent from '../../components/Loader';
import data from './data';
import Question from './components/Question';
import { useTranslation } from 'react-i18next';

export default function ReceiptDigitization() {
  const { input, inputUrl, questionnaire } = data;
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonIcon onClick={goBack} icon={arrowBack} className="clickable-cursor" /> */}
          </IonButtons>
          <IonTitle className="ion-text-center">{t(`dcag.tasks.imageDigitization.page.heading`)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        {/* <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} /> */}
        <IonImg src={inputUrl} alt={input}></IonImg>
        <form onSubmit={handleSubmit}>
          {questionnaire.map((question) => (
              <Question key={question.id} question={question} />
          ))}
        </form>
      </IonContent>
    </IonPage>
  );
}
