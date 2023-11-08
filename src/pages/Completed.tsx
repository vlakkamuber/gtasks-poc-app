import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
} from "@ionic/react";

import { useHistory } from 'react-router-dom';

const Completed: React.FC = () => {
    const history = useHistory()
    let selectedTask = JSON.parse(localStorage.getItem("selectedTask"));
    const goToTasks = ()=>{
      history.push("/dashboard/tasks");
    }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          <div className="center-content">
            <img src="../../public/assets/completed-right-tick.jpeg" width="30%"/>
            <h4>Completed</h4>
            <p>{selectedTask.type}</p>
            <p>Enjoying and earning while at work </p>
            <div className="button-container-completed">
              <IonButton expand="full" color="primary" style={{width:'100%'}} onClick={()=>goToTasks()}>Back to Task</IonButton>
              <IonButton expand="full" color="secondary" style={{width:'100%'}} onClick={()=>goToTasks()}>Exit</IonButton>
            </div>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Completed;