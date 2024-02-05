import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonIcon
} from '@ionic/react';
import { playCircleOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useTranslation } from 'react-i18next';
import { useUserAuth } from '../context/UserAuthContext';
import apiService from "./apiService"
const Training: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useUserAuth();
  const [trainingDoc,setTrainingDoc] = useState(null)
  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };

  const getTrainingsDoc = async ()=>{
    let data = await apiService.getTrainingsDoc({user});
    setTrainingDoc(data)
  }
  const videoRef = useRef(null);
  useEffect(()=>{
    getTrainingsDoc();
  },[])

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
            {/* <IonButton onClick={goBack}>Back</IonButton> */}
          </IonButtons>
          <IonTitle>{t(`dcag.home.training.page.heading`)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {trainingDoc && <IonContent fullscreen>
        <div style={{ padding: '10px' }}>
          <h2 style={{ marginLeft: '16px' }}>{t(`dcag.home.training.page.title`)}</h2>
          <ListItem>
            <ListItemLabel description={t(`dcag.home.training.page.subtitle`)}>
              <h2>{t(`dcag.home.training.page.required`)}</h2>
            </ListItemLabel>
          </ListItem>
          {trainingDoc.docs.map((doc)=>{
            return(
              <IonCard className="rounded-card">
            <video
              ref={videoRef}
              className="video-player"
              poster="assets/audio_to_audio.png"
              controls
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}>
              <source src={doc.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </IonCard>
            )
          })}
          
        </div>
      </IonContent>}
    </IonPage>
  );
};

export default Training;
