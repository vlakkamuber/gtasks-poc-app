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
  IonToast
} from '@ionic/react';

import { useHistory, useParams } from 'react-router-dom';
import { arrowBack, saveOutline, micOutline, image } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND, SHAPE } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { SIZE } from 'baseui/input';
import { useTranslation } from 'react-i18next';
import apiService from './apiService';
import { formatDate } from '../utils/mapTeluguDigitsToNumeric';
import LoadingComponent from '../components/Loader';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
const PerformTask: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();

  const goBack = () => {
    history.push('/dashboard/tasks'); // This function navigates back to the previous page
  };

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [useInput, setUseInput] = useState(false);
  //const [imageOutput,setImageOutput] = useState("")
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const getTaskDetail = async () => {
    let taskId = params.id;
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskDetail(userId, taskId)
      .then((result) => {
        console.log(result);
        setShowLoading(false);
        setSelectedTask(result);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

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
      } else if (selectedTask.taskType === 'AUDIO_TO_AUDIO') {
        if (useInput === true) {
          isDisabled = selectedTask.status === 'COMPLETED';
        } else {
          isDisabled = audioChunks.length === 0 || submitted || audioChunks.length === 0;
        }
      }
      setIsSubmitDisabled(isDisabled);
    }
  }, [submitted, audioChunks, useInput, selectedTask]);

  const startRecording = async () => {
    setIsRecording(true);
    setSubmitted(false);
    audioChunks.length = 0;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks([...audioChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      audioChunks.length = 0;
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (audioChunks.length) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      console.log(audioBlob.size, audioBlob.type);
    }
  }, [audioChunks]);

  const assignTaskToCompleted = (taskId, body) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignTaskToCompleted(userId, taskId, body)
      .then((result) => {
        console.log(result);
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

  const saveAudioToAPI = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (useInput === true && selectedTask.taskType === 'AUDIO_TO_AUDIO') {
      assignTaskToCompleted(selectedTask.taskId, { useInput: true, status: 'COMPLETED' });
    } else if (selectedTask.taskType === 'IMAGE_TO_TEXT') {
      assignTaskToCompleted(selectedTask.taskId, {
        output: selectedTask.output,
        status: 'COMPLETED'
      });
    } else {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      apiService
        .saveAudioBlobToStorage(selectedTask.uploadUrl, audioBlob)
        .then((result) => {
          console.log('Audio saved to the API.');
          assignTaskToCompleted(selectedTask.taskId, { useInput: false, status: 'COMPLETED' });
          //history.push("/dashboard/tasks/completed");
        })
        .catch((error) => {
          console.error('Error fetching task data:', error);
        });
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} className="clickable-cursor" />
          </IonButtons>
          <IonTitle className="ion-text-center">{t(`dcag.tasks.page.heading`)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} />
        {selectedTask ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '10px',
                margin: '20px'
              }}>
              <h2 className="no-padding-margin" style={{ marginBottom: '8px' }}>
                {selectedTask.taskName}
              </h2>
              <p className="no-padding-margin" style={{ fontSize: '0.9rem' }}>
                <samll>
                  {t(`dcag.tasks.createdAt.label`)}: {formatDate(selectedTask.createDateTime)}{' '}
                  {t(`dcag.tasks.dueDate.label`)}: {formatDate(selectedTask.dueDateTime)}
                </samll>
              </p>
              <p className="no-padding-margin">
                <span style={{ fontSize: '0.9rem' }}>{t(`dcag.tasks.payouts.label`)}:</span>{' '}
                <span style={{ fontWeight: '600' }}>${selectedTask.price}</span>
              </p>
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
                    disabled={selectedTask.status==='COMPLETED'}
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
              {(selectedTask.taskType === 'AUDIO_TO_AUDIO' ||
                selectedTask.taskType === 'AUDIO_TO_AUDIO') && (
                <div>
                  <h5>{t(`dcag.tasks.performTask.input.label`)}</h5>
                  <AudioPlayer audioSrc={selectedTask.inputUrl} />
                </div>
              )}
              {selectedTask.taskType === 'AUDIO_TO_AUDIO' && (
                <div>
                  <h5>{t(`dcag.tasks.performTask.inputAudio.confirm`)}</h5>
                  <RadioGroup
                    value={selectedTask.useInput || useInput}
                    onChange={(e) => setUseInput(e.currentTarget.value === 'true')}
                    name="number"
                    align={ALIGN.horizontal}
                    disabled={selectedTask.status === 'COMPLETED'}>
                    <Radio value={true}>{t(`dcag.tasks.performTask.inputAudio.confirm.yes`)}</Radio>
                    <Radio value={false}>{t(`dcag.tasks.performTask.inputAudio.confirm.no`)}</Radio>
                  </RadioGroup>
                </div>
              )}

              {selectedTask.status === 'IN_PROGRESS' &&
                useInput === false &&
                selectedTask.taskType !== 'IMAGE_TO_TEXT' && (
                  <IonLabel className="label-with-margin" style={{ marginTop: '20px' }}>
                    {t(`dcag.tasks.performTask.recordAudio.label`)}
                  </IonLabel>
                )}
              {useInput === false && selectedTask.taskType !== 'IMAGE_TO_TEXT' && (
                <div style={{ marginTop: '10px' }}>
                  {audioChunks.length > 0 && (
                    <AudioPlayer
                      audioSrc={URL.createObjectURL(new Blob(audioChunks, { type: 'audio/mpeg' }))}
                    />
                  )}
                  {selectedTask.status === 'COMPLETED' && selectedTask.useInput === false && (
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
                          <AudioPlayer audioSrc={selectedTask.outputUrl} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {selectedTask.status === 'IN_PROGRESS' &&
                useInput === false &&
                selectedTask.taskType !== 'IMAGE_TO_TEXT' && (
                  <div style={{ width: '100%', marginTop: '10px' }}>
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
                          <span>Recording in progress...</span>
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
                  secondaryActions={[
                    <Button
                      kind={KIND.secondary}
                      key="first"
                      onClick={(e) => history.push('/dashboard/help')}
                      disabled={selectedTask.status === 'COMPLETED'}>
                      {t(`dcag.home.btn.help.label`)}
                    </Button>
                  ]}
                  dismissiveAction={
                    <Button kind={KIND.tertiary} onClick={(e) => history.push('/dashboard/tasks')}>
                      {t(`dcag.home.btn.cancel.label`)}
                    </Button>
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
