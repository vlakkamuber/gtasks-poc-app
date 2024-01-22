import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonToast
  } from '@ionic/react';
  
  import { useHistory, useParams } from 'react-router-dom';
  import { arrowBack } from 'ionicons/icons';
  import { useState, useEffect } from 'react';

  import { ButtonDock } from 'baseui/button-dock';
  import { Button, KIND } from 'baseui/button';
  import { useTranslation } from 'react-i18next';
  import apiService from './apiService';
  import LoadingComponent from '../components/Loader';
  import { formatDate } from '../utils/mapTeluguDigitsToNumeric';
 

  const ImageUploadTask  = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const params = useParams();
  
    const goBack = () => {
      history.push('/dashboard/tasks'); // This function navigates back to the previous page
    };

    const [selectedTask, setSelectedTask] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [useInput, setUseInput] = useState(false);
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
            </>) : null}
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
  