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
import React, { useRef } from 'react';

import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useTranslation } from 'react-i18next';
const Training: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  const videoRef = useRef(null);

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
      <IonContent fullscreen>
        <div style={{ padding: '10px' }}>
          <h2 style={{ marginLeft: '16px' }}>{t(`dcag.home.training.page.title`)}</h2>
          <ListItem>
            <ListItemLabel description={t(`dcag.home.training.page.subtitle`)}>
              <h2>{t(`dcag.home.training.page.required`)}</h2>
            </ListItemLabel>
          </ListItem>
          <IonCard className="rounded-card">
            <video
              ref={videoRef}
              className="video-player"
              poster="assets/audio_to_audio.png"
              controls
              style={{ height: '20vh', width: '100%', objectFit: 'cover' }}>
              <source src={'assets/training_sample.mp4'} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <IonImg
              src={"assets/audio_to_audio.png"}
              alt={"sample"}
              className="video-thumbnail"
            />
            <IonCardContent>
              <IonIcon icon={playCircleOutline} className="play-icon" />
              <IonCardTitle>{"Text to Audio"}</IonCardTitle>
            </IonCardContent> */}
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Training;
