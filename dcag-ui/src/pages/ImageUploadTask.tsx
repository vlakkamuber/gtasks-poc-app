import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonToast,
    IonLabel,
    IonButton, IonInput, IonImg
  } from '@ionic/react';

  
  import { useHistory, useParams } from 'react-router-dom';
  import { arrowBack } from 'ionicons/icons';
  import { useState, useEffect } from 'react';

  import { ButtonDock } from 'baseui/button-dock';
  import { Button, KIND } from 'baseui/button';
  import { Textarea } from 'baseui/textarea';
  import { Input } from "baseui/input";
  import { useTranslation } from 'react-i18next';
  import apiService from './apiService';
  import LoadingComponent from '../components/Loader';
  import { formatDate } from '../utils/mapTeluguDigitsToNumeric';
 

  const ImageUploadTask: React.FC = () => {
    const [value,setValue] = useState("")
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
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [taskName,setTaskName] = useState("");
    const [imageDesc,setImageDesc] = useState("")

    const uplaodFileAndGetUploadUrl = (selectedFile)=>{
      let userId = JSON.parse(localStorage.getItem('loggedInUser'));
      apiService
        .uplaodFileAndGetUploadUrl(userId, selectedTask.taskId,selectedFile.name)
        .then((result) => {
         console.log(result)
        })
        .catch((error) => {
          console.error('Error fetching task data:', error);
        });
    }
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      // Check if selectedFile is not undefined before setting it
      if (selectedFile) {
        setFile(selectedFile);
        console.log(selectedFile)
        uplaodFileAndGetUploadUrl(selectedFile);
      }
    };

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

    useEffect(()=>{
      if (selectedTask) {
        let isDisabled = false;
        if (selectedTask.taskType === 'UPLOAD_IMAGE') {
            if(selectedTask.status==="IN_PROGRESS"){
              isDisabled = taskName===null || file ===null || imageDesc===null || imageDesc===""
            }else{
              isDisabled = selectedTask.status === 'COMPLETED';
            }
            
        }
        setIsSubmitDisabled(isDisabled);
      }
    },[taskName,file,imageDesc,selectedTask])


    const saveImageAndCompleteTask = async (e)=>{
      e.preventDefault();

    }

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
              {selectedTask.taskType === 'UPLOAD_IMAGE' && (
                <div>
                  <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
                    {t(`dcag.tasks.performTask.uploadImage.label`)}
                  </IonLabel>
                  <div className='image-upload-container'>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                    {file && <div className="image-container" style={{ marginTop: '10px' }}>
                      <img src={URL.createObjectURL(file)} />
                    </div>}
                  <IonLabel className="label-with-margin" style={{ marginTop: '10px' }}>
                    {t(`dcag.tasks.performTask.uploadImage.taskInput.label`)}
                  </IonLabel>
                  <Input
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                    clearOnEscape
                  />
                  <IonLabel className="label-with-margin">
                    {t(`dcag.tasks.performTask.uploadImage.image.decription`)}
                  </IonLabel>
                  <Textarea
                    value={imageDesc}
                    style={{ marginTop: '10px' }}
                    onChange={(e) => setImageDesc(e.target.value )}
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
                    <Button onClick={(e) => saveImageAndCompleteTask(e)} disabled={isSubmitDisabled}>
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
  