import React, { useRef, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, SIZE, ROLE } from 'baseui/modal';
import { HeadingXSmall } from 'baseui/typography';
import CircleIFilled from '@uber/icons/circle-i-filled';
import { IonCard, IonCardHeader, IonCardTitle, IonSpinner } from '@ionic/react';
import { snakeCaseToNormal } from '../../utils';
import useAnalytics from '../../hooks/useAnanlytics';
import {
  ANALYTICS_PAGE,
  LANGUAGE_CODE_MAPPER,
  TASK_TYPE_TO_TRAINING_VIDEO_MAPPER
} from '../../constants/constant';
import apiService from '../../BE-services/apiService';
import { useUserAuth } from '../../context/UserAuthContext';
import type { TrainingDoc } from '../../types/training-types';
import { useTranslation } from 'react-i18next';
import { Close } from 'baseui/modal/styled-components';

const Banner: React.FC<{
  isOpen: boolean;
  taskType: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen, taskType }) => {
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.tasks });
  const [trainingDoc, setTrainingDoc] = useState<{ docs: [TrainingDoc] }>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  const onPlay: (videoName: string) => void = (videoName) => {
    logEvent({ actions: 'click_video_play', properties: videoName });
  };
  const onPause: (videoName: string) => void = (videoName) => {
    logEvent({ actions: 'click_video_pause', properties: videoName });
  };

  const { user } = useUserAuth();

  const getTrainingsDoc: () => Promise<void> = async () => {
    const languageCode = localStorage.getItem('selectedLanguage') || '';
    const language = LANGUAGE_CODE_MAPPER[languageCode];
    const data: { docs: [TrainingDoc] } = await apiService
      .getTrainingsDoc({
        user,
        language,
        name: TASK_TYPE_TO_TRAINING_VIDEO_MAPPER[taskType]
      })
      .finally(() => {
        setLoading(false);
      });
    setTrainingDoc(data);
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (taskType) {
      getTrainingsDoc();
    }
  }, [taskType]);

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      animate
      autoFocus={false}
      size={SIZE.default}
      role={ROLE.alertdialog}
      overrides={{
        Root: {
          style: () => ({
            borderRadius: 0
          })
        },
        Close: { component: Close },
        Dialog: {
          style: {
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            padding: '20px'
          }
        }
      }}>
      <ModalHeader style={{ display: 'flex', justifyContent: 'center' }}>
        <CircleIFilled size={64} style={{ color: '#276EF1' }} />
      </ModalHeader>
      <ModalBody style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <HeadingXSmall style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          {t('dcag.tasks.TRAINING_MODAL.title')}
        </HeadingXSmall>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IonSpinner />
          </div>
        ) : null}
        {trainingDoc?.docs
          .filter((doc) => doc.name === TASK_TYPE_TO_TRAINING_VIDEO_MAPPER[taskType])
          .map((doc) => {
            return (
              <IonCard key={doc.name} className="rounded-card mt-16 mb-32">
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
      </ModalBody>
    </Modal>
  );
};

export default Banner;
