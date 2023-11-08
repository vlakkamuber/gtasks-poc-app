import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import {Button, KIND} from 'baseui/button';

const Completed: React.FC = () => {
  const history = useHistory();
  let selectedTask = JSON.parse(localStorage.getItem("selectedTask"));
  const goToTasks = () => {
    history.push("/dashboard/tasks");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="center-content">
          <img
            src="../../public/assets/completed-right-tick.jpeg"
            width="30%"
          />
          <h4>Completed</h4>
          <p>{selectedTask.type}</p>
          <p>Enjoying and earning while at work</p>
          <div className="button-container-completed">
            <Button kind={KIND.primary} onClick={()=>goToTasks()}>Back to tasks</Button>
            <Button kind={KIND.secondary} onClick={()=>goToTasks()}>Exit</Button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Completed;
