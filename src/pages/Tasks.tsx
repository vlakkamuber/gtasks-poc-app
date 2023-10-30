import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonLabel,
  IonList,
  IonItem,
  IonButton,
  IonButtons,
  IonBadge
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { person, list,arrowBack } from "ionicons/icons";
import { useHistory } from 'react-router-dom';
const initialTasks = [
  {
    name: "Task name ID",
    earnedPoints: "200",
    startDate: "12 /10/ 2023 ",
    endDate: "15/10/ 2023",
    type: "Text to audio",
    status: "new",
    typeDesc: "Record audio of text and earn in no time.",
  },
  {
    name: "Task name ID",
    earnedPoints: "200",
    startDate: "12 /10/ 2023 ",
    endDate: "15/10/ 2023",
    type: "Text to audio",
    status: "new",
    typeDesc: "Record audio of text and earn in no time.",
  },
  {
    name: "Task name ID",
    earnedPoints: "200",
    startDate: "12 /10/ 2023 ",
    endDate: "15/10/ 2023",
    type: "Text to audio",
    status: "not-started-yet",
    typeDesc: "Record audio of text and earn in no time.",
  },
  {
    name: "Task name ID",
    earnedPoints: "200",
    startDate: "12 /10/ 2023 ",
    endDate: "15/10/ 2023",
    type: "Audio to audio",
    status: "new",
    typeDesc: "Record audio by listening audio and earn in no time.",
  },
  {
    name: "Task name ID",
    earnedPoints: "200",
    startDate: "12 /10/ 2023 ",
    endDate: "15/10/ 2023",
    type: "Audio to audio",
    status: "new",
    typeDesc: "Record audio by listening audio and earn in no time.",
  },
  {
    name: "Task name ID",
    earnedPoints: "200",
    startDate: "12 /10/ 2023 ",
    endDate: "15/10/ 2023",
    type: "Audio to audio",
    status: "blocked",
    typeDesc: "Record audio by listening audio and earn in no time.",
  },
];

const Tasks: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("available_task");
  const [tasks, setTasks] = useState(groupBy(initialTasks, "type"));
  const [myTasks, setMyTasks] = useState(initialTasks);
  const history = useHistory()
  function groupBy(array, key) {
    return array.reduce((acc, item) => {
      const groupKey = item[key];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {});
  }

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
          <IonTitle className="ion-text-center">Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-start">
        <div className="tasks-info" style={{ marginTop: "30px" }}>
          <div className="task-detail">
            <div>
              <IonIcon icon={person} /> Tasks
            </div>
            <div>9</div>
          </div>
          <div className="task-count">
            <div>
              <IonIcon icon={list} /> You Earned
            </div>
            <div>$990</div>
          </div>
        </div>
        <IonSegment
          color="default"
          value={selectedSegment}
          className="tasks-tab"
          onIonChange={(e) => setSelectedSegment(e.detail.value)}
        >
          <IonSegmentButton
            value="available_task"
            className={
              selectedSegment === "available_task" ? "tasks-tab-content" : ""
            }
          >
            Available tasks
          </IonSegmentButton>
          <IonSegmentButton
            value="my_tasks"
            className={
              selectedSegment === "my_tasks" ? "tasks-tab-content" : ""
            }
          >
            My tasks
          </IonSegmentButton>
          {/* Add more segments as needed */}
        </IonSegment>
        {selectedSegment === "available_task" && (
          <>
            <IonContent>
              <React.Fragment>
                {Object.keys(tasks).map((key) => {
                  return (
                    <>
                      <div className="ion-padding">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h1 style={{ margin: "0", marginBottom: "-4px" }}>
                            {key}
                          </h1>
                          <span>2 New</span>
                        </div>

                        <p style={{ margin: "0" }}>
                          <small>{tasks[key][0].typeDesc}</small>
                        </p>
                      </div>
                      {tasks[key].map((task, index) => {
                        return (
                          <>
                            <IonList>
                              <IonItem>
                                <IonLabel>
                                  <span style={{display:'flex'}}>
                                    <h2>{task.name}</h2>
                                    <IonBadge color="primary" className={`status-text-${task.status}`}>{task.status}</IonBadge>
                                  </span>{" "}
                                  
                                  <p>Payouts: {task.earnedPoints}</p>
                                  <p>
                                    <small>
                                      Assigned time: {task.startDate} End time:{" "}
                                      {task.startDate}
                                    </small>
                                  </p>
                                </IonLabel>
                                <IonButton
                                  slot="end"
                                  style={{
                                    "--background": "black",
                                    "--border-radius": "10px",
                                  }}
                                >
                                  Start Work
                                </IonButton>
                              </IonItem>
                              {/* Add more IonItem elements as needed */}
                            </IonList>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </React.Fragment>
              <></>
            </IonContent>
          </>
        )}

        {selectedSegment === "my_tasks" && (
          <div>
            <h2>Content for Segment 2</h2>
            {/* Add content for Segment 2 */}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
