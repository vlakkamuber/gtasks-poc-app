import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonImg, IonToast, useIonLoading, IonAlert } from '@ionic/react';
import Question from './components/Questions';
import { Block } from 'baseui/block';
import { ArrowLeft } from 'baseui/icon';
import { LabelMedium, ParagraphSmall } from 'baseui/typography';
import { questionnaireData } from './questions';
import { useTranslation } from 'react-i18next';
import { HeadingXSmall, LabelSmall } from 'baseui/typography';
import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND } from 'baseui/button';
import { useStyletron } from 'baseui';
import apiService from '../apiService';
import { useHistory, useParams } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { ANALYTICS_PAGE, LOADER_MESSAGE } from '../../constants/constant';
import LoadingComponent from '../../components/Loader';
import ZoomedImage from './components/ZoomedImage';
import { showPayout } from '../../utils/Settings';
import useAnalytics from '../../hooks/useAnanlytics';

export default function QuestionnaireTaskCategory() {
  const { user } = useUserAuth();
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();
  const [_, theme] = useStyletron();
  const [formState, setFormState] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [present, dismiss] = useIonLoading();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.tasks });
  const getTaskDetail = async () => {
    let taskId = params.id;
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskDetail({ userId, taskId, user })
      .then((result) => {
        setShowLoading(false);
        setSelectedTask(result);
        const questionsData = questionnaireData[result.taskType];
        if (result.taskType === 'RECEIPT_DIGITIZATION') {
          setQuestions([questionsData[0]]);
        } else {
          setQuestions(questionsData);
        }
      })
      .catch((error) => {
        setShowLoading(false);
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
          updatedFormState[item.questionId] = item.type === 'DATE' ? new Date() : '';
        });
        setFormState(updatedFormState);
      }
    }
  }, [selectedTask]);

  useEffect(() => {
    console.log(selectedTask, formState);
    if (selectedTask && selectedTask.taskType === 'RECEIPT_DIGITIZATION') {
      if (formState && formState['is_the_receipt_readable_or_not_readable'] === 'yes') {
        const questionsData = questionnaireData[selectedTask.taskType];
        setQuestions(questionsData);
      } else {
        const questionsData = questionnaireData[selectedTask.taskType];
        setQuestions([questionsData[0]]);
      }
    }
  }, [selectedTask, formState]);

  useEffect(() => {
    setShowLoading(true);
    getTaskDetail();
  }, []);

  useEffect(() => {
    logEvent({
      actions: '',
      properties: params.id
    });
  }, []);

  const goBack = () => {
    logEvent({
      actions: 'click_go_back',
      properties: selectedTask?.taskId,
      otherDetails: selectedTask?.taskType
    });
    history.goBack(); // This function navigates back to the previous page
  };

  const assignTaskToCompleted = (taskId, body) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignTaskToCompleted({
        userId,
        taskId,
        body: { output: JSON.stringify(body), status: 'COMPLETED' },
        user
      })
      .then((result) => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          history.push('/dashboard/tasks');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const handleSubmit = (e) => {
    logEvent({
      actions: 'click_submit',
      properties: selectedTask.taskId,
      otherDetails: JSON.stringify({ ...formState, taskType: selectedTask.taskType })
    });
    e.preventDefault();
    console.log(formState);
    const formDataForSubmission = Object.keys(formState).map((questionId) => ({
      questionId,
      answer: formState[questionId]
    }));
    assignTaskToCompleted(selectedTask.taskId, formDataForSubmission);
  };

  const onClickCancel = () => {
    logEvent({
      actions: 'click_start_cancel',
      properties: selectedTask.taskId,
      otherDetails: selectedTask.taskType
    });
  };

  const closeCancelModal = () => {
    logEvent({
      actions: 'click_abort_cancel',
      properties: selectedTask.taskId,
      otherDetails: selectedTask.taskType
    });
  };

  const handleCancel = async () => {
    try {
      logEvent({
        actions: 'click_confirm_cancel',
        properties: selectedTask.taskId,
        otherDetails: selectedTask.taskType
      });
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
  };

  const isFormValid = () => {
    for (const questionId in formState) {
      if (!formState[questionId]) {
        return false;
      }
    }
    return true;
  };

  const handleLogEvent = (actions, otherDetails) => {
    logEvent({
      actions,
      properties: selectedTask.taskId,
      otherDetails: JSON.stringify({ ...otherDetails, taskType: selectedTask.taskType })
    });
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} />
        <div className="fixed-header" style={{ zIndex: '22222222' }}>
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
              {/* <LabelSmall>Help</LabelSmall> */}
            </Button>
          </Block>
        </div>
        {selectedTask && (
          <>
            <div className="p-16">
              <div className="fixed-header-buffer"></div>
              {/* <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} /> */}
              <HeadingXSmall>{selectedTask.taskName}</HeadingXSmall>
              {showPayout && (
                <p className="no-padding-margin">
                  <span style={{ fontSize: '0.9rem' }}>{t(`dcag.tasks.payouts.label`)}:</span>{' '}
                  <span style={{ fontWeight: '600' }}>₹{selectedTask.price}</span>
                </p>
              )}
              <HeadingXSmall>
                {t(`dcag.home.taskHub.${selectedTask.taskType}.title`)}{' '}
              </HeadingXSmall>
              {/* <IonImg src={selectedTask.inputUrl} alt={selectedTask.input} className='receipt-container'></IonImg> */}
              <Block className="receipt-container">
                <ZoomedImage imageUrl={selectedTask.inputUrl}></ZoomedImage>
              </Block>
              {selectedTask.taskType == 'LOCALIZATION_QUALITY' && (
                <ParagraphSmall>
                  {t('dcag.questionnaire.instruction')}
                  <Block display="flex">
                    <ul>
                      <li>{t('dcag.questionnaire.option.strongly_agree')}</li>
                      <li>{t('dcag.questionnaire.option.agree')}</li>
                    </ul>
                    <ul>
                      <li>{t('dcag.questionnaire.option.disagree')}</li>
                      <li>{t('dcag.questionnaire.option.strongly_disagree')}</li>
                    </ul>
                  </Block>
                </ParagraphSmall>
              )}
              <HeadingXSmall>Task questionnaire</HeadingXSmall>
              {questions.map((item) => (
                <Question
                  key={item.id}
                  question={item}
                  value={formState[item.questionId]}
                  onChange={(questionId, value) => {
                    setFormState((state) => ({ ...state, [questionId]: value }));
                  }}
                  isCompleted={selectedTask.status === 'COMPLETED' ? true : false}
                  logEvent={handleLogEvent}
                />
              ))}
              {selectedTask.status !== 'COMPLETED' && (
                <LabelSmall>
                  <span style={{ color: theme.colors.contentNegative }}>*</span> Required question
                </LabelSmall>
              )}
              {selectedTask.status !== 'COMPLETED' && (
                <ButtonDock
                  primaryAction={
                    <Button
                      onClick={handleSubmit}
                      disabled={!isFormValid() || selectedTask.status === 'COMPLETED'}>
                      Submit
                    </Button>
                  }
                  dismissiveAction={
                    <>
                      <Button
                        kind={KIND.tertiary}
                        id="cancel-task"
                        colors={{ color: '#E11900', backgroundColor: 'transparent' }}
                        onClick={onClickCancel}>
                        {t(`dcag.home.btn.cancel.label`)}
                      </Button>
                      <IonAlert
                        header="Alert!"
                        message="Are you sure, you want to cancel this task?"
                        trigger="cancel-task"
                        buttons={[
                          {
                            text: 'No',
                            role: 'cancel',
                            handler: closeCancelModal
                          },
                          {
                            text: 'Yes',
                            role: 'confirm',
                            handler: handleCancel
                          }
                        ]}></IonAlert>
                    </>
                  }
                />
              )}
            </div>
          </>
        )}
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
