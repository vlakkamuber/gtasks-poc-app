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
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";

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
        <div style={{display:'flex',justifyContent:'space-between',padding:'15px',alignItems:'center'}}>
          <div>
            <h4 className="mt-0 mb-0">Tasks Hub</h4>
            <p className="mt-0 mb-0">Localize text and video documents.</p>
          </div>
          <IonButton routerLink="/dashboard/tasks" style={{
                                  "--background": "#f3f3f3",
                                  "--border-radius": "23px",
                                  "height": "30px",
                                  "color": "rgb(0, 0, 0)",
                                  "fontSize": "0.7rem"
                                }}>
            View all tasks
          </IonButton>
        </div>
        <IonCard style={{borderRadius:'10px'}}>
          <img
            alt="Silhouette of mountains"
            src="public/assets/text_to_audio.png"
            style={{objectFit:'cover'}}
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
        <IonCard style={{borderRadius:'10px'}}>
          <img
            alt="Silhouette of mountains"
            src="public/assets/audio_to_audio.png"
            style={{objectFit:'cover'}}
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
        <IonCard style={{borderRadius:'10px'}}>
          <img
            alt="Silhouette of mountains"
            src="public/assets/text_to_image.png"
            style={{objectFit:'cover'}}
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
