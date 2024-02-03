import React, { useState,useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonImg,
  IonToast,
  useIonLoading
} from '@ionic/react';
import Question from './components/Questions';
import { Block } from 'baseui/block';
import { ArrowLeft } from 'baseui/icon';
import { LabelMedium } from 'baseui/typography';
import {questionnaireData} from "./questions"
import { useTranslation } from 'react-i18next';
import { HeadingXSmall, LabelSmall } from 'baseui/typography';
import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND } from 'baseui/button';
import { useStyletron } from 'baseui';
import apiService from '../apiService';
import { useHistory,useParams } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { LOADER_MESSAGE } from '../../constants/constant';
import LoadingComponent from '../../components/Loader';

export default function QuestionnaireTaskCategory() {
  const { user } = useUserAuth();
  const history = useHistory()
  const params = useParams();
  const { t } = useTranslation();
  const [_, theme] = useStyletron();
  const [formState, setFormState] = useState({});
  const [selectedTask,setSelectedTask] = useState(null)
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [questions,setQuestions] = useState([])
  const [present, dismiss] = useIonLoading();
  const getTaskDetail = async () => {
    let taskId = params.id;
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskDetail({ userId, taskId, user })
      .then((result) => {
        setShowLoading(false);
        setSelectedTask(result);
        const questionsData = questionnaireData[result.taskType];
        setQuestions(questionsData)
        
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  useEffect(() => {
    if (selectedTask && questions.length > 0) {
      const outputArray = JSON.parse(selectedTask.output);
      if (outputArray) {
        const updatedFormState = {};
        outputArray.forEach(({ questionId, answer }) => {
          updatedFormState[questionId] = answer;
        });
        setFormState(updatedFormState);
      } else {
        const updatedFormState = {};
        questions.forEach((item) => {
          updatedFormState[item.questionId] = item.type === "DATE" ? new Date() : '';
        });
        setFormState(updatedFormState);
      }
    }
  }, [questions, selectedTask]);
  

  useEffect(()=>{
    setShowLoading(true);
    getTaskDetail();
  },[])

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };

  const assignTaskToCompleted = (taskId, body) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignTaskToCompleted({ userId, taskId, body:{output:JSON.stringify(body),status:"COMPLETED"}, user })
      .then((result) => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          history.push('/dashboard/tasks');
        }, 2000);
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

  const handleCancel = async (e)=>{
    e.preventDefault();
    try {
      let userId = JSON.parse(localStorage.getItem('loggedInUser'));
      const taskId = selectedTask.taskId;
      present(LOADER_MESSAGE);
      await apiService.releaseTask({ userId, taskId, user });
      dismiss();
      history.push('/dashboard/tasks');
    } catch (err) {
      dismiss();
      console.log('Error ', err);
    }
  }

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
      <IonContent className="ion-padding" fullscreen>
      <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} />
      <div className="fixed-header">
          <Block className="p-16 fixed-header-home-content ">
            <Button
              kind={KIND.tertiary}
              onClick={goBack}
              overrides={{
                BaseButton: {
                  style: () => ({
                    padding: '0px'
                  })
                }
              }}>
              <ArrowLeft size={32} />
            </Button>
            <LabelMedium>{t(`dcag.tasks.page.heading`)}</LabelMedium>
            <Button
              kind={KIND.tertiary}
              overrides={{
                BaseButton: {
                  style: () => ({
                    padding: '0px'
                  })
                }
              }}>
              <LabelSmall>Help</LabelSmall>
            </Button>
          </Block>
        </div>
      {selectedTask && <>
        <div className="p-16">
        <div className="fixed-header-buffer"></div>
       
        {/* <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} /> */}
        <HeadingXSmall>{selectedTask.taskName}</HeadingXSmall>
        <HeadingXSmall>{t(`dcag.home.taskHub.${selectedTask.taskType}.title`)} </HeadingXSmall>
        <IonImg src={selectedTask.inputUrl} alt={selectedTask.input} className='receipt-container'></IonImg>
        <HeadingXSmall>Task questionnaire</HeadingXSmall>
        <form onSubmit={handleSubmit}>
          {questions.map((item) => (
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
         {selectedTask.status !== "COMPLETED" && <LabelSmall>
            <span style={{ color: theme.colors.contentNegative }}>*</span> Required question
          </LabelSmall>}
          {selectedTask.status !== "COMPLETED" && <ButtonDock
            primaryAction={<Button onClick={handleSubmit}  disabled={!isFormValid() || selectedTask.status === "COMPLETED"}>Submit</Button>}
            dismissiveAction={<Button kind={KIND.tertiary} onClick={handleCancel}>Cancel</Button>}
          />}
        </form>
        </div>
        </>}
        <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Success! Task completed successfully."
              duration={5000}
              color="success"
              position="top"
              className="success-toast"
            />
      </IonContent>
    </IonPage>
  );
}
