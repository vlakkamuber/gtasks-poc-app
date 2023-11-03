import { IonList, IonItem, IonBadge, IonLabel } from "@ionic/react";
import "./Tab1.css";
import { useHistory } from "react-router-dom";
import { chevronForward } from "ionicons/icons";
import React, { useState,useEffect } from "react";

const BlockedTasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  useEffect(() => {
    let userTasks = JSON.parse(localStorage.getItem("tasks"));
    let user = userTasks.find(function (item) {
      return item.phone === localStorage.getItem("phone");
    });
    if (user) {
      let completedTasks =
        user.tasks &&
        user.tasks.filter(function (item) {
          return item.status === "Completed";
        });
      setTasks(groupBy(completedTasks, "type"));
    }
  }, []);
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
  const goToPerformTask = (e, task) => {
    history.push("/dashboard/tasks/perform-task/" + task.id);
  };
  return (
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
                <h1 style={{ margin: "0", marginBottom: "-4px" }}>{key}</h1>
                <span>View all</span>
              </div>

              <p style={{ margin: "0" }}>
                <small>{tasks[key][0].taskDesc}</small>
              </p>
            </div>
            {tasks[key].map((task, index) => {
              return (
                <>
                  <IonList>
                    <IonItem>
                      <IonLabel>
                        <span style={{ display: "flex" }}>
                          <h2>{task.name} {task.id}</h2>
                          <IonBadge
                            color="primary"
                            className={`status-text-blocked`}
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
                      {/* <IonButton
                                  slot="end"
                                  style={{
                                    "--background": "black",
                                    "--border-radius": "10px",
                                  }}
                                onClick={(e)=>goToPerformTask(e,task)}>
                                  continue
                                </IonButton> */}
                      <ion-icon icon={chevronForward}></ion-icon>
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
  );
};

export default BlockedTasks;
