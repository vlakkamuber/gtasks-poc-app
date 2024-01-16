import {
  IonList,
  IonItem,
  IonBadge,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { chevronForward } from "ionicons/icons";
import React, { useState,useEffect } from "react";
import { useTranslation } from 'react-i18next';
import apiService from "./apiService";
import {formatDate} from "../utils/mapTeluguDigitsToNumeric"

const CompletedTasks: React.FC = () => {
  const { t } = useTranslation();
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
  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  const getMyTasksList = ()=>{
    let userId = JSON.parse(localStorage.getItem("loggedInUser"))
    apiService
      .getMyTasksList(userId)
      .then((result) => {
        setTasks(groupBy(result, "taskType"));
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }

  useEffect(() => {
    getMyTasksList();
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
    history.push("/dashboard/tasks/perform-task/" + task.taskId);
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
                <h1 style={{ margin: "0", marginBottom: "-4px" }}>{t(`dcag.tasks.${key.replace(/\s+/g, '')}.title`)}</h1>
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
                          <h2>{task.taskName}</h2>
                          <IonBadge
                            color="primary"
                            className={`status-text-completed`}
                          >
                             {t(`dcag.home.taskHub.status.${task.status}`)}
                          </IonBadge>
                        </span>{" "}
                        <p>{t(`dcag.tasks.payouts.label`)}: ${task.price}</p>
                        <p>
                          <small>
                          {t(`dcag.tasks.createdAt.label`)}: {formatDate(task.createDateTime)} {t(`dcag.tasks.dueDate.label`)}:{" "}
                            {formatDate(task.dueDateTime)}
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
