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

const taskCategories = [
  {
    id: 'RECORD_AUDIO',
    imageSrc: 'assets/text_to_audio.png',
    title: 'Record Audio',
    subtitle: 'Read text, validate pronunciation and record correct audio',
    show:true
  },
  {
    id: 'DESCRIBE_IMAGE',
    imageSrc: 'assets/audio_to_audio.png',
    title: 'Describe Image',
    subtitle: 'View the location image and provide description about the image.',
    show:false
  },
  {
    id: 'UPLOAD_IMAGE',
    imageSrc: 'assets/audio_to_audio.png',
    title: 'Upload Image',
    subtitle: 'upload a location image and provide description about the image.',
    show:false
  },
  {
    id: 'RECEIPT_DIGITIZATION',
    imageSrc: 'assets/audio_to_audio.png',
    title: 'Receipt Digitization',
    subtitle: 'View the receipt image and provide answer about the image.',
    show:true
  },
  {
    id: 'LOCALISATION_QUALITY',
    imageSrc: 'assets/audio_to_audio.png',
    title: 'Localisation Quality',
    subtitle: 'View the receipt image and provide answer about the image.',
    show:true
  },

];
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
  const renderTaskCards = () => {
    return taskCategories.map((category) => (
      category.show && (<div key={category.id} className="mt-0 mb-0 p-4">
        <IonCard
          style={{ borderRadius: '10px', marginBottom: '3rem', cursor: 'pointer' }}
          onClick={() => handleTaskCategory(category.id)}>
          <img alt="Silhouette of mountains" src={category.imageSrc} style={{ objectFit: 'cover' }} />
          <IonCardHeader>
            <IonCardTitle>{t(`dcag.home.taskHub.${category.id}.title`)}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{t(`dcag.home.taskHub.${category.id}.subtitle`)}</IonCardContent>
        </IonCard>
      </div>)
    ));
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
        {renderTaskCards()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
