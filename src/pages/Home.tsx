import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { useHistory } from "react-router-dom";
import { arrowBack } from "ionicons/icons";
import { useEffect } from "react";
import {tasks} from "./data"

const Home: React.FC = () => {
  const history = useHistory();
  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("tasks"))){
      localStorage.setItem("tasks",JSON.stringify(tasks))
    }
  })
  

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
          <img
            alt="Silhouette of mountains"
            src="public/assets/text_to_audio.png"
          />
          <IonCardHeader>
            <IonCardTitle>Text to Audio • <span className="record-text">Localise,Record </span></IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent>
            Read the documents which is assigned with local language or in
            English and record the voice with the same .
          </IonCardContent>
        </IonCard>
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="public/assets/audio_to_audio.png"
          />
          <IonCardHeader>
            <IonCardTitle>Audio to Audio •<span className="record-text">Localise,Record </span></IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent>
            Read the documents which is assigned with local language or in
            English and record the voice with the same .
          </IonCardContent>
        </IonCard>
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="public/assets/text_to_image.png"
          />
          <IonCardHeader>
            <IonCardTitle>Text to Image • <span className="record-text">Localise,Record </span></IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent>
            Read the documents which is assigned with local language or in
            English and record the voice with the same .
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
