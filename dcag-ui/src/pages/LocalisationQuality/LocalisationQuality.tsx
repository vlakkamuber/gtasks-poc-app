import React, { useState,useEffect } from 'react';
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
import Question from './components/Question';
import {questionnaireData} from "./questions"
import { useTranslation } from 'react-i18next';
import { HeadingXSmall, LabelSmall } from 'baseui/typography';
import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND } from 'baseui/button';
import { useStyletron } from 'baseui';
import apiService from '../apiService';
import { useHistory,useParams } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';


const defaultState = {};

const localizationQualityQuestions = questionnaireData.LOCALIZATION_QUALITY;
localizationQualityQuestions.forEach((item) => {
  defaultState[item.questionId] = '';
});


export default function LocalisationQuality() {
  const { user } = useUserAuth()
  const params = useParams();
  const { t } = useTranslation();
  const [_, theme] = useStyletron();
  const [formState, setFormState] = useState(defaultState);
  const [selectedTask,setSelectedTask] = useState(null)
  const [showLoading, setShowLoading] = useState(false);
  const getTaskDetail = async () => {
    let taskId = params.id;
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskDetail({ userId, taskId, user })
      .then((result) => {
        console.log(result);
        setShowLoading(false);
        setSelectedTask(result);
        const outputArray = JSON.parse(result.output);
        const updatedFormState = {};
        outputArray.forEach(({ questionId, answer }) => {
          updatedFormState[questionId] = answer;
        });
        console.log(updatedFormState)
        setFormState(updatedFormState);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };
  useEffect(()=>{
    getTaskDetail();
  },[])

  const assignTaskToCompleted = (taskId, body) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignTaskToCompleted({ userId, taskId, body:{output:JSON.stringify(body),status:"COMPLETED"}, user })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    const formDataForSubmission = Object.keys(formState).map((questionId) => ({
      questionId,
      answer: formState[questionId],
    }));
    assignTaskToCompleted(selectedTask.taskId,formDataForSubmission)
  };
  const isFormValid = () => {
    for (const questionId in formState) {
      if (!formState[questionId]) {
        return false;
      }
    }
    return true;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonIcon onClick={goBack} icon={arrowBack} className="clickable-cursor" /> */}
          </IonButtons>
          <IonTitle className="ion-text-center">
            {t(`dcag.tasks.page.heading`)}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {selectedTask && <IonContent className="ion-padding">
        {/* <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} /> */}
        <HeadingXSmall>{selectedTask.taskName}</HeadingXSmall>
        <IonImg src={selectedTask.inputUrl} alt={selectedTask.input}></IonImg>
        <HeadingXSmall>Task questionnaire</HeadingXSmall>
        <form onSubmit={handleSubmit}>
          {receiptDigitizationQuestions.map((item) => (
            <Question
              key={item.id}
              question={item}
              value={formState[item.questionId]}
              onChange={(questionId, value) => {
                setFormState((state) => ({ ...state, [questionId]: value }));
              }}
              isCompleted={selectedTask.status==="COMPLETED" ? true : false}
            />
          ))}
          <LabelSmall>
            <span style={{ color: theme.colors.contentNegative }}>*</span> Required question
          </LabelSmall>
          <ButtonDock
            primaryAction={<Button onClick={handleSubmit}  disabled={!isFormValid() || selectedTask.status === "COMPLETED"}>Submit</Button>}
            dismissiveAction={<Button kind={KIND.tertiary}>Cancel</Button>}
          />
        </form>
      </IonContent>}
    </IonPage>
  );
}
