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
import apiService from './apiService';
import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE, LANGUAGE_CODE_MAPPER } from '../constants/constant';
import { snakeCaseToNormal } from '../utils/mapTeluguDigitsToNumeric';
const Training: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useUserAuth();
  const [trainingDoc, setTrainingDoc] = useState(null);
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.training });
  useEffect(() => {
    logEvent({ actions: '' });
  }, []);
  const goBack = () => {
    logEvent({ actions: 'click_go_back' });
    history.goBack(); // This function navigates back to the previous page
  };

  const getTrainingsDoc = async () => {
    const languageCode = localStorage.getItem('selectedLanguage') || '';
    const language = LANGUAGE_CODE_MAPPER[languageCode];
    let data = await apiService.getTrainingsDoc({ user, language });
    setTrainingDoc(data);
  };
  const videoRef = useRef(null);
  useEffect(() => {
    getTrainingsDoc();
  }, []);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const onPlay = (videoName) => {
    logEvent({ actions: 'click_video_play', properties: videoName });
  };
  const onPause = (videoName) => {
    logEvent({ actions: 'click_video_pause', properties: videoName });
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
      {trainingDoc && (
        <IonContent fullscreen>
          <div style={{ padding: '10px' }}>
            <h2 style={{ marginLeft: '16px' }}>{t(`dcag.home.training.page.title`)}</h2>
            <ListItem>
              <ListItemLabel description={t(`dcag.home.training.page.subtitle`)}>
                <h2>{t(`dcag.home.training.page.required`)}</h2>
              </ListItemLabel>
            </ListItem>
            {trainingDoc.docs.map((doc) => {
              return (
                <IonCard className="rounded-card mt-16 mb-32">
                  <IonCardHeader>
                    <IonCardTitle>{snakeCaseToNormal(doc.name)}</IonCardTitle>
                  </IonCardHeader>
                  <video
                    controlsList="nodownload"
                    ref={videoRef}
                    className="video-player"
                    poster="assets/audio_to_audio.png"
                    controls
                    onPlay={() => onPlay(doc.name)}
                    onPause={() => onPause(doc.name)}
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}>
                    <source src={doc.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </IonCard>
              );
            })}
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Training;
