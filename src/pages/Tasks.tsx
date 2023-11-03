import React, { useEffect, useState } from "react";
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
  IonBadge,
} from "@ionic/react";
import "./Tab1.css";
import { person, list, arrowBack, people, medal, business } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import MyTasks from "./MyTasks";

const Tasks: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("available_task");
  const [user,setUser] = useState({})
  const [tasks, setTasks] = useState([]);
  const history = useHistory();
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

  useEffect(() => {
    let userTasks = JSON.parse(localStorage.getItem("tasks"));
    let user = userTasks.find(function(item){
      return item.phone===localStorage.getItem("phone")
    })
    if(user){
      let newTasks = user.tasks && user.tasks.filter(function(item){
        return item.status==='new' || item.status==='New'
      })
      setTasks(groupBy(newTasks, "type"));
    }
   
  }, []);

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };

  const goToPerformTask = (e, task) => {
    history.push("/dashboard/tasks/perform-task/" + task.id);
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
            <div style={{color: '#5e5e5e'}}>
              <IonIcon icon={people} /> Tasks
            </div>
            <div style={{fontSize: '2rem'}}>9</div>
          </div>
          <div className="vertical-bar" style={{borderLeft:'2px solid #ddd'}}></div>
          <div className="task-count">
            <div style={{color: '#5e5e5e'}}>
              <IonIcon icon={business} /> You Earned
            </div>
            <div style={{fontSize: '2rem'}}>$990</div>
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
              selectedSegment === "available_task"
                ? "tasks-tab-content capitalize"
                : "capitalize"
            }
          >
            Available tasks
          </IonSegmentButton>
          <IonSegmentButton
            value="my_tasks"
            className={
              selectedSegment === "my_tasks"
                ? "tasks-tab-content capitalize"
                : "capitalize"
            }
          >
            My tasks
          </IonSegmentButton>
          {/* Add more segments as needed */}
        </IonSegment>
        {selectedSegment === "available_task" && (
          <>
            <React.Fragment>
              {Object.keys(tasks).map((key) => {
                return (
                  <>
                    <div className="ion-padding" key={key}>
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
                        <span style={{ color: "#467ff4" }}>{tasks[key].length} New</span>
                      </div>

                      <p style={{ margin: "0" }}>
                        <small>{tasks[key][0].taskDesc}</small>
                      </p>
                    </div>
                    {tasks[key].map((task, index) => {
                      return (
                        <>
                          <IonList key={task.id}>
                            <IonItem>
                              <IonLabel>
                                <span style={{ display: "flex" }}>
                                  <h2>{task.name} {task.id} </h2>
                                  <IonBadge
                                    color="primary"
                                    className={`status-text-${task.status}`}
                                  >
                                    {task.status}
                                  </IonBadge>
                                </span>{" "}
                                <p>Payouts: {task.pay}</p>
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
                                onClick={(e) => goToPerformTask(e, task)}
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
          </>
        )}

        {selectedSegment === "my_tasks" && (
          <React.Fragment>
            <MyTasks />
          </React.Fragment>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
