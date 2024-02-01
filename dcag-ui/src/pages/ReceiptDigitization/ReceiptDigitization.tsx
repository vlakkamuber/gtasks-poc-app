import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonImg,
} from '@ionic/react';
import LoadingComponent from '../../components/Loader';
import data from './data';
import Question from './components/Question';
import { useTranslation } from 'react-i18next';
import { HeadingXSmall, LabelSmall } from 'baseui/typography';
import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND } from 'baseui/button';
import { useStyletron } from 'baseui';

const defaultState = {};
data.questionnaire.forEach((question) => {
  defaultState[question.id] = '';
});


export default function ReceiptDigitization() {
  const { input, inputUrl, questionnaire } = data;
  const { t } = useTranslation();
  const [_, theme] = useStyletron();
  const [formState, setFormState] = useState(defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonIcon onClick={goBack} icon={arrowBack} className="clickable-cursor" /> */}
          </IonButtons>
          <IonTitle className="ion-text-center">
            {t(`dcag.tasks.imageDigitization.page.heading`)}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} /> */}
        <HeadingXSmall>Receipt Digitization</HeadingXSmall>
        <IonImg src={inputUrl} alt={input}></IonImg>
        <HeadingXSmall>Task questionnaire</HeadingXSmall>
        <form onSubmit={handleSubmit}>
          {questionnaire.map((question) => (
            <Question
              key={question.id}
              question={question}
              value={formState[question.id]}
              onChange={(id, value) => {
                setFormState((state) => ({ ...state, [id]: value }));
              }}
            />
          ))}
          <LabelSmall>
            <span style={{ color: theme.colors.contentNegative }}>*</span> Required question
          </LabelSmall>
          <ButtonDock
            primaryAction={<Button onClick={handleSubmit}>Submit</Button>}
            dismissiveAction={<Button kind={KIND.tertiary}>Cancel</Button>}
          />
        </form>
      </IonContent>
    </IonPage>
  );
}
