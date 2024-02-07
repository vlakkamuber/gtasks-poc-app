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
  IonToast
} from '@ionic/react';

import React, { useHistory, useParams } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { useState, useEffect } from 'react';

import { ButtonDock } from 'baseui/button-dock';
import { Button, KIND } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { Input } from 'baseui/input';
import { useTranslation } from 'react-i18next';
import apiService from './apiService';
import LoadingComponent from '../components/Loader';
import { formatDate } from '../utils/mapTeluguDigitsToNumeric';
import { useUserAuth } from '../context/UserAuthContext';
import { showPayout } from '../utils/Settings';
import useAnalytics from '../hooks/useAnanlytics';

const ImageUploadTask: React.FC = () => {
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();
  const { user } = useUserAuth();
  const logEvent = useAnalytics({ page: 'upload image Task' });

  const goBack = () => {
    history.push('/dashboard/tasks'); // This function navigates back to the previous page
  };

  const [selectedTask, setSelectedTask] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [taskName, setTaskName] = useState('');
  const [imageDesc, setImageDesc] = useState('');
  const [storageURL, setSelectedStorageURL] = useState('');

  const uplaodFileAndGetUploadUrl = (selectedFile) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .uplaodFileAndGetUploadUrl({
        userId,
        taskId: selectedTask.taskId,
        filename: selectedFile.name,
        user
      })
      .then((result) => {
        console.log(result);
        setSelectedStorageURL(result);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    // Check if selectedFile is not undefined before setting it
    if (selectedFile) {
      setFile(selectedFile);
      console.log(selectedFile);
      uplaodFileAndGetUploadUrl(selectedFile);
    }
  };

  const getTaskDetail = async () => {
    let taskId = params.id;
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskDetail({ userId, taskId, user })
      .then((result) => {
        console.log(result);
        setShowLoading(false);
        setSelectedTask(result);
        setImageDesc(result.outputDesc);
        setTaskName(result.taskName);
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
      if (selectedTask.taskType === 'UPLOAD_IMAGE') {
        if (selectedTask.status === 'IN_PROGRESS') {
          isDisabled =
            taskName === null ||
            file === null ||
            imageDesc === null ||
            imageDesc === '' ||
            submitted === true;
        } else {
          isDisabled = selectedTask.status === 'COMPLETED';
        }
      }
      setIsSubmitDisabled(isDisabled);
    }
  }, [file, imageDesc, selectedTask, submitted]);

  const uploadImageToStorageUrl = () => {
    apiService
      .uploadImageToStorageUrl({ uploadUrl: storageURL, file, user })
      .then((result) => {
        console.log(result);
        assignTaskToCompleted();
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const assignTaskToCompleted = () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    let body = {
      status: 'COMPLETED',
      outputDesc: imageDesc,
      taskName: taskName,
      output: file.name
    };
    apiService
      .assignTaskToCompleted({ userId, taskId: selectedTask?.taskId, body, user })
      .then((result) => {
        console.log(result);
        setShowLoading(false);
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

  const saveImageAndCompleteTask = async (e) => {
    logEvent({ actions: 'submit task', properties: selectedTask.taskId });
    e.preventDefault();
    setSubmitted(true);
    uploadImageToStorageUrl();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} className="clickable-cursor" />
          </IonButtons>
          <IonTitle>{t(`dcag.tasks.page.heading`)}</IonTitle>
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
              {/* <p className="no-padding-margin" style={{ fontSize: '0.9rem' }}>
                <samll>
                  {t(`dcag.tasks.createdAt.label`)}: {formatDate(selectedTask.createDateTime)}{' '}
                  {t(`dcag.tasks.dueDate.label`)}: {formatDate(selectedTask.dueDateTime)}
                </samll>
              </p> */}
              {showPayout && (
                <p className="no-padding-margin">
                  <span style={{ fontSize: '0.9rem' }}>{t('dcag.home.taskHub.rate')}::</span>{' '}
                  <span style={{ fontWeight: '600' }}>${selectedTask.price}</span>
                </p>
              )}
              {selectedTask.taskType === 'UPLOAD_IMAGE' && (
                <div style={{ marginTop: '10px' }}>
                  <IonLabel
                    className="label-with-margin"
                    style={{ marginTop: '10px', marginBottom: '10px' }}>
                    {t(`dcag.tasks.UPLOAD_IMAGE.title`)}
                  </IonLabel>
                  {file && (
                    <div
                      className="image-container"
                      style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <img src={URL.createObjectURL(file)} />
                    </div>
                  )}
                  {selectedTask.status != 'COMPLETED' && (
                    <div
                      className="image-upload-container"
                      style={{ height: '100px', marginTop: '10px', marginBottom: '10px' }}>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        disabled={selectedTask.status === 'COMPLETED'}
                      />
                    </div>
                  )}
                  {selectedTask.status === 'COMPLETED' && selectedTask.outputUrl && (
                    <div
                      className="image-container"
                      style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <img src={selectedTask.outputUrl} />
                    </div>
                  )}
                  <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
                    {t(`dcag.tasks.performTask.uploadImage.taskInput.label`)}
                  </IonLabel>
                  <Input
                    value={taskName}
                    overrides={{
                      Root: {
                        style: () => ({
                          marginTop: '10px',
                          marginBottom: '10px'
                        })
                      }
                    }}
                    onChange={(e) => setTaskName(e.target.value)}
                    disabled={selectedTask.status === 'COMPLETED'}
                  />
                  <IonLabel className="label-with-margin">
                    {t(`dcag.tasks.performTask.uploadImage.image.decription`)}
                  </IonLabel>
                  <Textarea
                    value={imageDesc}
                    style={{ marginTop: '10px' }}
                    onChange={(e) => setImageDesc(e.target.value)}
                    rows="2"
                    disabled={selectedTask.status === 'COMPLETED'}
                    overrides={{
                      Root: {
                        style: () => ({
                          marginTop: '10px',
                          marginBottom: '10px'
                        })
                      }
                    }}
                  />
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
                    <Button
                      onClick={(e) => saveImageAndCompleteTask(e)}
                      disabled={isSubmitDisabled}>
                      {t(`dcag.home.btn.submit.label`)}
                    </Button>
                  }
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

export default ImageUploadTask;
