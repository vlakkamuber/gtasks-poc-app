import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/react';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategory } from '../context/TaskCategoryContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { selectedCategory, setSelectedCategory } = useCategory();

  const handleTaskCategory = (category) => {
    // Set the selected category in localStorage
    localStorage.setItem('selectedCategory', category);
    setSelectedCategory(category);
    history.push('/dashboard/tasks');
  };

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
          </IonButtons> */}
          <IonTitle>{t(`dcag.home.bottomTabs.home`)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px',
            paddingBottom: '0px',
            alignItems: 'center'
          }}>
          <div>
            <h3 className="mt-0 mb-0">{t(`dcag.home.taskHub.title`)}</h3>
          </div>
          <IonButton
            onClick={() => handleTaskCategory('ALL')}
            style={{
              '--background': '#000',
              '--border-radius': '23px',
              height: '30px',
              color: '#fff',
              fontSize: '0.7rem'
            }}>
            {t(`dcag.home.taskHub.btn.viewAllTasks`)}
          </IonButton>
        </div>
        <p className="mt-0 mb-0 p-16">{t(`dcag.home.taskHub.subtitle`)}</p>
        <div className="mt-0 mb-0 p-4">
          <IonCard
            style={{ borderRadius: '10px', marginBottom: '3rem', cursor: 'pointer' }}
            onClick={() => handleTaskCategory('AUDIO_TO_AUDIO')}>
            <img
              alt="Silhouette of mountains"
              src="assets/text_to_audio.png"
              style={{ objectFit: 'cover' }}
            />
            <IonCardHeader>
              <IonCardTitle>{t(`dcag.home.taskHub.RECORD_AUDIO.title`)}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>{t(`dcag.home.taskHub.RECORD_AUDIO.subtitle`)}</IonCardContent>
          </IonCard>
        </div>
        {/* <IonCard style={{borderRadius:'10px',marginBottom: '3rem',cursor:'pointer'}} onClick={()=>handleTaskCategory("IMAGE_TO_TEXT")}>
          <img
            alt="Silhouette of mountains"
            src="assets/audio_to_audio.png"
            style={{objectFit:'cover'}}
          />
          <IonCardHeader>
            <IonCardTitle>{t(`dcag.home.taskHub.DESCRIBE_IMAGE.title`)}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          {t(`dcag.home.taskHub.DESCRIBE_IMAGE.subtitle`)}
          </IonCardContent>
        </IonCard> */}
        {/* <IonCard style={{borderRadius:'10px',marginBottom: '3rem',cursor:'pointer'}} onClick={()=>handleTaskCategory("UPLOAD_IMAGE")}>
          <img
            alt="Silhouette of mountains"
            src="assets/text_to_image.png"
            style={{objectFit:'cover'}}
          />
          <IonCardHeader>
            <IonCardTitle> {t(`dcag.home.taskHub.UPLOAD_IMAGE.title`)}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          {t(`dcag.home.taskHub.UPLOAD_IMAGE.subtitle`)}
          </IonCardContent>
        </IonCard> */}
         <IonCard style={{borderRadius:'10px',marginBottom: '3rem',cursor:'pointer'}} onClick={()=>handleTaskCategory("RECEIPT_DIGITIZATION")}>
          <img
            alt="Silhouette of mountains"
            src="assets/audio_to_audio.png"
            style={{objectFit:'cover'}}
          />
          <IonCardHeader>
            <IonCardTitle>{t(`dcag.home.taskHub.RECEIPT_DIGITIZATION.title`)}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          {t(`dcag.home.taskHub.RECEIPT_DIGITIZATION.subtitle`)}
          </IonCardContent>
        </IonCard>
        <IonCard style={{borderRadius:'10px',marginBottom: '3rem',cursor:'pointer'}} onClick={()=>handleTaskCategory("LOCALISATION_QUALITY")}>
          <img
            alt="Silhouette of mountains"
            src="assets/audio_to_audio.png"
            style={{objectFit:'cover'}}
          />
          <IonCardHeader>
            <IonCardTitle>{t(`dcag.home.taskHub.LOCALISATION_QUALITY.title`)}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          {t(`dcag.home.taskHub.LOCALISATION_QUALITY.subtitle`)}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
