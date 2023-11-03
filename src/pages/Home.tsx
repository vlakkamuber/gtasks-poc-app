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
const tasks = [
  {
    "id": "101",
    "phone": "8686478524",
    "name": "sameer mishra",
    "ratings": 3.4,
    "totalPoints": "",
    "tasks": [
      {
        "name": "Task1",
        "id": "101",
        "pay": "200",
        "status": "new",
        "type": "Text To audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task2",
        "id": "102",
        "pay": "200",
        "status": "new",
        "type": "Text To audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task3",
        "id": "103",
        "pay": "200",
        "status": "new",
        "type": "Text To audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      
      {
        "name": "Task4",
        "id": "104",
        "pay": "200",
        "status": "new",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task5",
        "id": "105",
        "pay": "200",
        "status": "new",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task6",
        "id": "106",
        "pay": "200",
        "status": "new",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task7",
        "id": "107",
        "pay": "200",
        "status": "In Progress",
        "type": "Text to audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task8",
        "id": "108",
        "pay": "200",
        "status": "In Progress",
        "type": "Text to audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task9",
        "id": "109",
        "pay": "200",
        "status": "In Progress",
        "type": "Text to audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task10",
        "id": "110",
        "pay": "200",
        "status": "In Progress",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task11",
        "id": "111",
        "pay": "200",
        "status": "In Progress",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task12",
        "id": "112",
        "pay": "200",
        "status": "In Progress",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task13",
        "id": "113",
        "pay": "200",
        "status": "Completed",
        "type": "Text To audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task14",
        "id": "114",
        "pay": "200",
        "status": "Completed",
        "type": "Text To audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task15",
        "id": "115",
        "pay": "200",
        "status": "Completed",
        "type": "Text To audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task16",
        "id": "116",
        "pay": "200",
        "status": "Completed",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task17",
        "id": "117",
        "pay": "200",
        "status": "Completed",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task18",
        "id": "118",
        "pay": "200",
        "status": "Completed",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task19",
        "id": "119",
        "pay": "200",
        "status": "Blocked",
        "type": "Text to audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task20",
        "id": "120",
        "pay": "200",
        "status": "Blocked",
        "type": "Text to audio",
        "taskDesc": "Record audio of text and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      },
      {
        "name": "Task21",
        "id": "121",
        "pay": "200",
        "status": "Blocked",
        "type": "Audio to audio",
        "taskDesc": "Record audio by listening audio and earn in no time.",
        "input": "Hyderabad",
        "output": "",
        "startDate": "12/10/2023 ",
        "endDate": "15/10/ 2023"
      }
    ]
  }
]

const Home: React.FC = () => {
  const history = useHistory();
  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
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
            <IonCardTitle>Audio to Text •<span className="record-text">Localise,Record </span></IonCardTitle>
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
