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
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("tasks"))){
      tasks[0]["phone"]=localStorage.getItem("phone")
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
          {/* <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
          </IonButtons> */}
          <IonTitle className="ion-text-center">{t(`dcag.home.bottomTabs.home`)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{display:'flex',justifyContent:'space-between',padding:'15px',alignItems:'center'}}>
          <div>
            <h3 className="mt-0 mb-0">{t(`dcag.home.taskHub.title`)}</h3>
            <p className="mt-0 mb-0">{t(`dcag.home.taskHub.subtitle`)}</p>
          </div>
          <IonButton routerLink="/dashboard/tasks" style={{
                                  "--background": "#000",
                                  "--border-radius": "23px",
                                  "height": "30px",
                                  "color": "#fff",
                                  "fontSize": "0.7rem"
                                }}>
            {t(`dcag.home.taskHub.btn.viewAllTasks`)}
          </IonButton>
        </div>
        <IonCard style={{borderRadius:'10px',marginBottom: '3rem'}} onClick={()=>history.push("/dashboard/tasks")}>
          <img
            alt="Silhouette of mountains"
            src="assets/text_to_audio.png"
            style={{objectFit:'cover'}}
          />
          <IonCardHeader>
            <IonCardTitle>{t(`dcag.home.taskHub.textToAudio.title`)} <span className="record-text">Localise,Record </span></IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent>
            {t(`dcag.home.taskHub.textToAudio.subtitle`)}.
          </IonCardContent>
        </IonCard>
        <IonCard style={{borderRadius:'10px',marginBottom: '3rem'}} onClick={()=>history.push("/dashboard/tasks")}>
          <img
            alt="Silhouette of mountains"
            src="assets/audio_to_audio.png"
            style={{objectFit:'cover'}}
          />
          <IonCardHeader>
            <IonCardTitle>{t(`dcag.home.taskHub.audioToAudio.title`)} <span className="record-text">Localise,Record </span></IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent>
          {t(`dcag.home.taskHub.audioToAudio.subtitle`)}.
          </IonCardContent>
        </IonCard>
        <IonCard style={{borderRadius:'10px',marginBottom: '3rem'}} onClick={()=>history.push("/dashboard/tasks")}>
          <img
            alt="Silhouette of mountains"
            src="assets/text_to_image.png"
            style={{objectFit:'cover'}}
          />
          <IonCardHeader>
            <IonCardTitle> {t(`dcag.home.taskHub.textToImage.title`)} <span className="record-text">Localise,Record </span></IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent>
          {t(`dcag.home.taskHub.textToImage.subtitle`)}.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
