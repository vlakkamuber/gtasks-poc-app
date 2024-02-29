import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonRadio,
  IonToast,
  useIonLoading,
  IonAlert
} from '@ionic/react';

import { useHistory, useParams } from 'react-router-dom';
import { arrowBack, saveOutline, micOutline, image } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND, SHAPE } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { SIZE } from 'baseui/input';
import { useTranslation } from 'react-i18next';
import apiService from '../../BE-services/apiService';
import { formatDate, to2DecimalPlaces } from '../../utils';
import LoadingComponent from '../../components/Loader';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { useUserAuth } from '../../context/UserAuthContext';
import { ANALYTICS_PAGE, LOADER_MESSAGE } from '../../constants/constant';
import { showPayout } from '../../constants/flags';
import useAnalytics from '../../hooks/useAnanlytics';
import { generateQuestionId } from './constants/questions';
import Banner from './Banner';
import { TagFilled } from '@uber/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import { HeadingMedium, LabelMedium, ParagraphMedium } from 'baseui/typography';
import { Modal, ModalBody, ModalButton, ModalFooter, ModalHeader } from 'baseui/modal';
import CancleTaskIcon from './CancleTaskModal/CancleTaskIcon';
import CancleTaskModal from './CancleTaskModal';

const PerformTask: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();
  const { user } = useUserAuth();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.tasks });

  const goBack = () => {
    logEvent({ actions: 'click_go_back' });
    history.push('/dashboard/tasks'); // This function navigates back to the previous page
  };

  const [present, dismiss] = useIonLoading();

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [useInput, setUseInput] = useState(null);
  const [isPronunciationLocal, setIsPronunciationLocal] = useState(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  //const [imageOutput,setImageOutput] = useState("")
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isCancleModalOpen, setIsCancleModalOpen] = useState(false);

  const getTaskDetail = async () => {
    let taskId = params.id;
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskDetail({ userId, taskId, user })
      .then((result) => {
        setShowLoading(false);
        setSelectedTask(result);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  useEffect(() => {
    logEvent({
      actions: '',
      properties: params.id
    });
  }, []);

  useEffect(() => {
    setShowLoading(true);
    getTaskDetail();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      let isDisabled = false;
      if (selectedTask.taskType === 'IMAGE_TO_TEXT') {
        isDisabled =
          selectedTask.status === 'COMPLETED' || selectedTask.output === null || submitted;
      } else if (selectedTask.taskType === 'RECORD_AUDIO') {
        if (useInput === null || isPronunciationLocal === null) {
          isDisabled = true;
        } else if (useInput === true && isPronunciationLocal === true) {
          isDisabled = selectedTask.status === 'COMPLETED' || submitted;
        } else {
          isDisabled = submitted || audioChunks.length === 0;
        }
      }
      setIsSubmitDisabled(isDisabled);
    }
  }, [submitted, audioChunks, useInput, isPronunciationLocal, selectedTask]);

  useEffect(() => {
    if (selectedTask) {
      const { taskType } = selectedTask;
      const taskTypes = localStorage.getItem('trainingBannerShownForTasksTypes') ?? '[]';
      const taskTypesArray = JSON.parse(taskTypes);
      if (taskTypesArray.find((task: string) => task === taskType)) {
        setIsBannerVisible(false);
      } else {
        setIsBannerVisible(true);
        taskTypesArray.push(taskType);
        localStorage.setItem('trainingBannerShownForTasksTypes', JSON.stringify(taskTypesArray));
      }
    }
  }, [selectedTask]);

  const startRecording = async () => {
    logEvent({
      actions: 'click_start_record_audio',
      properties: selectedTask.taskId,
      otherDetails: selectedTask.taskType
    });
    setIsRecording(true);
    setSubmitted(false);
    audioChunks.length = 0;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((audioChunks) => [...audioChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      };

      recorder.start(40000);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    logEvent({
      actions: 'click_stop_recording',
      properties: selectedTask?.taskId,
      otherDetails: selectedTask?.taskType
    });
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (audioChunks.length) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      if (audioChunks.length >= 1) {
        stopRecording();
      }
    }
  }, [audioChunks]);

  const assignTaskToCompleted = (taskId, body) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignTaskToCompleted({ userId, taskId, body, user })
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

  const generateOutput = () => {
    return JSON.stringify([
      {
        questionId: generateQuestionId('dcag.tasks.performTask.inputAudio.confirm'),
        answer: useInput ? 'yes' : 'no'
      },
      {
        questionId: generateQuestionId('dcag.tasks.performTask.inputAudioLocal.confirm'),
        answer: isPronunciationLocal ? 'yes' : 'no'
      }
    ]);
  };

  const saveAudioToAPI = async (e) => {
    logEvent({
      actions: 'click_submit',
      properties: selectedTask.taskId,
      otherDetails: selectedTask?.output ? `output: ${selectedTask?.output}` : ''
    });
    e.preventDefault();
    setSubmitted(true);
    if (
      useInput === true &&
      isPronunciationLocal === true &&
      selectedTask.taskType === 'RECORD_AUDIO'
    ) {
      assignTaskToCompleted(selectedTask.taskId, {
        useInput: true,
        status: 'COMPLETED',
        output: generateOutput()
      });
    } else if (selectedTask.taskType === 'IMAGE_TO_TEXT') {
      assignTaskToCompleted(selectedTask.taskId, {
        output: selectedTask.output,
        status: 'COMPLETED'
      });
    } else {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      apiService
        .saveAudioBlobToStorage({ uploadUrl: selectedTask.uploadUrl, audioBlob, user })
        .then((result) => {
          console.log('Audio saved to the API.');
          assignTaskToCompleted(selectedTask.taskId, {
            useInput: false,
            status: 'COMPLETED',
            output: generateOutput()
          });
          //history.push("/dashboard/tasks/completed");
        })
        .catch((error) => {
          console.error('Error fetching task data:', error);
        });
    }
  };

  const stopWork = async () => {
    try {
      logEvent({
        actions: 'click_confirm_cancel',
        properties: selectedTask.taskId,
        otherDetails: selectedTask.tastType
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

  const closeCancelModal = () => {
    logEvent({
      actions: 'click_abort_cancel',
      properties: selectedTask.taskId,
      otherDetails: selectedTask.tastType
    });
    setIsCancleModalOpen(false);
  };

  const onPlay = () => {
    logEvent({
      actions: 'click_play_audio',
      properties: selectedTask.taskId,
      otherDetails: selectedTask.taskType
    });
  };

  const onPause = () => {
    logEvent({
      actions: 'click_pause_audio',
      properties: selectedTask.taskId,
      otherDetails: selectedTask.taskType
    });
  };

  const onRadioChange = (e) => {
    const question = t(`dcag.tasks.performTask.inputAudio.confirm`);
    const value =
      e.currentTarget.value === 'true'
        ? t(`dcag.tasks.performTask.inputAudio.confirm.yes`)
        : t(`dcag.tasks.performTask.inputAudio.confirm.no`);
    logEvent({
      actions: 'click_radio_button',
      properties: selectedTask.taskId,
      otherDetails: JSON.stringify({
        question,
        value,
        taskType: selectedTask.taskType
      })
    });
    setUseInput(e.currentTarget.value === 'true');
  };

  const onLocalPronunciationRadioChange = (e) => {
    const question = t(`dcag.tasks.performTask.inputAudioLocal.confirm`);
    const value =
      e.currentTarget.value === 'true'
        ? t(`dcag.tasks.performTask.inputAudioLocal.confirm.yes`)
        : t(`dcag.tasks.performTask.inputAudioLocal.confirm.no`);
    logEvent({
      actions: 'click_radio_button',
      properties: selectedTask.taskId,
      otherDetails: JSON.stringify({
        question,
        value,
        taskType: selectedTask.taskType
      })
    });
    setSelectedTask({
      ...selectedTask,
      output: {
        ...selectedTask.output,
        questionId: generateQuestionId('dcag.tasks.performTask.inputAudioLocal.confirm'),
        answer: e.currentTarget.value === 'true' ? 'yes' : 'no'
      }
    });
    setIsPronunciationLocal(e.currentTarget.value === 'true');
  };

  const handleClickCancel = () => {
    logEvent({
      actions: 'click_start_cancel',
      properties: selectedTask.taskId,
      otherDetails: selectedTask.taskType
    });
    setIsCancleModalOpen(true);
  };

  return (
    <IonPage>
      <IonContent>
        <PageHeader
          page={ANALYTICS_PAGE.tasks}
          title={t(`dcag.tasks.page.heading`)}
          showLanguageSwitcher={false}
        />
        <Banner
          isOpen={isBannerVisible}
          setIsOpen={setIsBannerVisible}
          taskType={selectedTask?.taskType || ''}
        />
        <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} />
        {selectedTask ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '10px',
                margin: '8px 20px 0px'
              }}>
              <h2 className="no-padding-margin" style={{ marginBottom: '8px' }}>
                {selectedTask.taskName}
              </h2>
              {/* <p className="no-padding-margin" style={{ fontSize: '0.9rem' }}>
                <samll>
                  {t(`dcag.tasks.createdAt.label`)}: {formatDate(selectedTask.createDateTime)}{' '}
                  {t(`dcag.tasks.dueDate.label`)}: {formatDate(selectedTask.dueDateTime)}
                </samll>
              </p> */}
              {showPayout && (
                <p className="no-padding-margin">
                  <span style={{ fontSize: '0.9rem' }}>
                    <TagFilled color={'#0E8345'} style={{ marginRight: 4 }} />
                  </span>{' '}
                  <span style={{ fontWeight: '600' }}>₹{to2DecimalPlaces(selectedTask.price)}</span>
                </p>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '10px',
                marginLeft: '20px',
                marginRight: '20px'
              }}>
              {selectedTask.taskType === 'IMAGE_TO_TEXT' && (
                <div>
                  <div className="image-container">
                    <img src={selectedTask.inputUrl} />
                  </div>
                  <IonLabel className="label-with-margin">
                    {t(`dcag.tasks.performTask.image.description.label`)}
                  </IonLabel>
                  <Textarea
                    value={selectedTask.output}
                    style={{ marginTop: '10px' }}
                    onChange={(e) => setSelectedTask({ ...selectedTask, output: e.target.value })}
                    rows="2"
                    disabled={selectedTask.status === 'COMPLETED'}
                    overrides={{
                      Root: {
                        style: () => ({
                          marginTop: '10px'
                        })
                      }
                    }}
                  />
                </div>
              )}
              {(selectedTask.taskType === 'TEXT_TO_AUDIO' ||
                selectedTask.taskType === 'TEXT_TO_AUDIO') && (
                <div>
                  <IonLabel className="label-with-margin">
                    {t(`dcag.tasks.performTask.input.label`)}
                  </IonLabel>
                  <Textarea
                    value={selectedTask.input}
                    style={{ marginTop: '10px' }}
                    rows="1"
                    overrides={{
                      Root: {
                        style: () => ({
                          marginTop: '10px'
                        })
                      }
                    }}
                  />
                </div>
              )}
              {(selectedTask.taskType === 'RECORD_AUDIO' ||
                selectedTask.taskType === 'RECORD_AUDIO') && (
                <div>
                  <div style={{ marginBottom: 10 }}>
                    <IonLabel className="label-with-margin">
                      {t(`dcag.tasks.performTask.input.label`)}
                    </IonLabel>
                  </div>
                  <AudioPlayer audioSrc={selectedTask.inputUrl} onPause={onPause} onPlay={onPlay} />
                </div>
              )}
              {selectedTask.taskType === 'RECORD_AUDIO' && (
                <div style={{ marginTop: 20 }}>
                  <div>
                    <LabelMedium>{t(`dcag.tasks.performTask.inputAudio.confirm`)}</LabelMedium>
                    <RadioGroup
                      value={
                        selectedTask.status === 'COMPLETED'
                          ? JSON.parse(selectedTask.output).find(
                              (question) =>
                                question.questionId === 'dcagtasksperformtaskinputaudioconfirm'
                            ).answer === 'yes'
                          : useInput
                      }
                      onChange={onRadioChange}
                      name="number"
                      align={ALIGN.horizontal}
                      disabled={selectedTask.status === 'COMPLETED'}>
                      <Radio value={true}>
                        {t(`dcag.tasks.performTask.inputAudio.confirm.yes`)}
                      </Radio>
                      <Radio value={false}>
                        {t(`dcag.tasks.performTask.inputAudio.confirm.no`)}
                      </Radio>
                    </RadioGroup>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <LabelMedium>{t(`dcag.tasks.performTask.inputAudioLocal.confirm`)}</LabelMedium>
                    <RadioGroup
                      value={
                        selectedTask.status === 'COMPLETED'
                          ? JSON.parse(selectedTask.output).find(
                              (question) =>
                                question.questionId === 'dcagtasksperformtaskinputaudiolocalconfirm'
                            ).answer === 'yes'
                          : isPronunciationLocal
                      }
                      onChange={onLocalPronunciationRadioChange}
                      name="number"
                      align={ALIGN.horizontal}
                      disabled={selectedTask.status === 'COMPLETED'}>
                      <Radio value={true}>
                        {t(`dcag.tasks.performTask.inputAudioLocal.confirm.yes`)}
                      </Radio>
                      <Radio value={false}>
                        {t(`dcag.tasks.performTask.inputAudioLocal.confirm.no`)}
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {selectedTask.status === 'IN_PROGRESS' &&
                (useInput === false || isPronunciationLocal === false) &&
                selectedTask.taskType !== 'IMAGE_TO_TEXT' && (
                  <IonLabel className="label-with-margin" style={{ marginTop: '20px' }}>
                    {t(`dcag.tasks.performTask.recordAudio.label`)}
                  </IonLabel>
                )}
              {(selectedTask.useInput === false ||
                // updated selectedTask
                isPronunciationLocal === false) &&
                selectedTask.taskType !== 'IMAGE_TO_TEXT' && (
                  <div style={{ marginTop: '10px' }}>
                    {audioChunks.length > 0 && (
                      <AudioPlayer
                        audioSrc={URL.createObjectURL(
                          new Blob(audioChunks, { type: 'audio/mpeg' })
                        )}
                        onPause={onPause}
                        onPlay={onPlay}
                      />
                    )}
                    {selectedTask.status === 'COMPLETED' &&
                      (selectedTask.useInput === false ||
                        // updated selectedTask
                        selectedTask.isPronunciationLocal === false) && (
                        <div>
                          <h5>{t(`dcag.tasks.performTask.output.label`)}</h5>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: '',
                              alignItems: 'center',
                              marginBottom: '5px'
                            }}>
                            <IonRadio
                              color="primary" // Set the checkbox color to "primary"
                              slot="start" // Position the checkbox on the left
                              checked={true}
                              class="black-circle-checkbox"></IonRadio>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '80vw'
                              }}>
                              <AudioPlayer
                                audioSrc={selectedTask.outputUrl}
                                onPause={onPause}
                                onPlay={onPlay}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              {selectedTask.status === 'IN_PROGRESS' &&
                (useInput === false || isPronunciationLocal === false) &&
                selectedTask.taskType !== 'IMAGE_TO_TEXT' && (
                  <div style={{ width: '100%' }}>
                    {isRecording ? (
                      <div
                        style={{
                          height: '200px',
                          backgroundColor: '#000',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '10px'
                        }}>
                        <div style={audioRecordingStyle} onClick={stopRecording}>
                          <span>{t('dcag.home.btn.recordInProgress.label')}...</span>
                          <div
                            className="tap-save-container"
                            style={{ width: '100px', height: '100px' }}>
                            <IonIcon icon={saveOutline} className="tap-save-icon" />
                          </div>
                          <span className="save-text">{t(`dcag.home.btn.tapToSave.label`)}</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            height: '200px',
                            backgroundColor: '#f3f3f3',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '10px'
                          }}>
                          <div style={audioRecordingStyle}>
                            <div>
                              <IonIcon
                                icon={micOutline}
                                style={{ fontSize: '4rem', color: '#467ff4' }}></IonIcon>
                            </div>
                            <Button
                              shape={SHAPE.pill}
                              size={SIZE.compact}
                              disabled={selectedTask.status === 'COMPLETED'}
                              onClick={startRecording}>
                              {t(`dcag.home.btn.startRecording.label`)}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              {selectedTask.status === 'IN_PROGRESS' && (
                <ButtonDock
                  overrides={{
                    Root: {
                      style: () => ({
                        paddingLeft: '0px',
                        paddingRight: '0px'
                      })
                    }
                  }}
                  primaryAction={
                    <Button onClick={(e) => saveAudioToAPI(e)} disabled={isSubmitDisabled}>
                      {t(`dcag.home.btn.submit.label`)}
                    </Button>
                  }
                  dismissiveAction={
                    <>
                      <Button
                        kind={KIND.tertiary}
                        id="cancel-task"
                        onClick={handleClickCancel}
                        colors={{ color: '#E11900', backgroundColor: 'transparent' }}>
                        {t(`dcag.home.btn.cancel.label`)}
                      </Button>
                      <CancleTaskModal
                        closeCancelModal={closeCancelModal}
                        stopWork={stopWork}
                        price={to2DecimalPlaces(selectedTask.price)}
                        isCancleModalOpen={isCancleModalOpen}
                        setIsCancleModalOpen={setIsCancleModalOpen}
                      />
                    </>
                  }
                />
              )}
            </div>
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Success! Task completed successfully."
              duration={5000}
              color="success"
              position="top"
              className="success-toast"
            />
          </>
        ) : null}
      </IonContent>
    </IonPage>
  );
};
const audioRecordingStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // height: "100px",
  color: '#fff',
  // width: "100px",
  borderRadius: '50%',
  gap: '2px'
};

export default PerformTask;
