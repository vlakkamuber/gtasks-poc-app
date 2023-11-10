import {
  IonList,
  IonItem,
  IonBadge,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { chevronForward } from "ionicons/icons";
import React, { useState,useEffect } from "react";

const CompletedTasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  const history = useHistory();
  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  useEffect(() => {
    let userTasks = JSON.parse(localStorage.getItem("tasks"));
    // let user = (userTasks && userTasks.find(function (item) {
    //   return item.phone === localStorage.getItem("phone");
    // })) || userTasks[0]
    let user = userTasks && userTasks[0]
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
                {/* <span>View all</span> */}
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
                          <h2>{task.name}</h2>
                          <IonBadge
                            color="primary"
                            className={`status-text-completed`}
                          >
                            {task.status}
                          </IonBadge>
                        </span>{" "}
                        <p>Payouts: {task.pay}</p>
                        <p>
                          <small>
                            Created date: {task.startDate} Due date:{" "}
                            {task.startDate}
                          </small>
                        </p>
                      </IonLabel>
                      <ion-icon icon={chevronForward} onClick={(e)=>goToPerformTask(e,task)}></ion-icon>
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

export default CompletedTasks
