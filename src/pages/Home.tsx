import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButtons,IonButton,IonIcon} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonIcon onClick={goBack} icon={arrowBack} />
            {/* <IonButton onClick={goBack}>Back</IonButton> */}
          </IonButtons>
          <IonTitle className="ion-text-center">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Silhouette of mountains" src="public/assets/text_to_audio.png" />
      <IonCardHeader>
        <IonCardTitle>Text to Audio • Localise,Record</IonCardTitle>
        {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
      </IonCardHeader>

      <IonCardContent>Read the documents which is assigned with local language or in English and record the voice with the same .</IonCardContent>
    </IonCard>
    <IonCard>
      <img alt="Silhouette of mountains" src="public/assets/audio_to_audio.png" />
      <IonCardHeader>
        <IonCardTitle>Audio to Text • Localise,Record</IonCardTitle>
        {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
      </IonCardHeader>

      <IonCardContent>Read the documents which is assigned with local language or in English and record the voice with the same .</IonCardContent>
    </IonCard>
    <IonCard>
      <img alt="Silhouette of mountains" src="public/assets/text_to_image.png" />
      <IonCardHeader>
        <IonCardTitle>Text to Image • Localise,Record</IonCardTitle>
        {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
      </IonCardHeader>

      <IonCardContent>Read the documents which is assigned with local language or in English and record the voice with the same .</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
