import React, { useEffect, useState } from 'react';
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
} from '@ionic/react';
import { people, business } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import MyTasks from './MyTasks';
import { useTranslation } from 'react-i18next';
import apiService from './apiService';
import { filterTaskWithType, formatDate } from '../utils/mapTeluguDigitsToNumeric';
import LoadingComponent from '../components/Loader';
import { FILTER_OUT_TEXT_TO_AUDIO_TASK, TEXT_TO_AUDIO_TASK_TYPE } from '../constants/contant';

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const [selectedSegment, setSelectedSegment] = useState('available_task');
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [myTasksCount, setMyTasksCount] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
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
  const getAvailableTasks = () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getAvailableTasks(userId)
      .then((res) => {
        setShowLoading(false);
        // temporary - this filter should be removed in future;
        const result = FILTER_OUT_TEXT_TO_AUDIO_TASK
          ? filterTaskWithType(res, TEXT_TO_AUDIO_TASK_TYPE)
          : res;
        console.log(result);
        setAvailableCount(result.length);
        setTasks(groupBy(result, 'taskType'));
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };
  const getTaskSummary = () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskSummary(userId)
      .then((result) => {
        console.log(result);
        setCompletedCount(result.completedTaskCount);
        setTotalEarned(result.totalEarning);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const getMyTasksList = () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getMyTasksList(userId)
      .then((res) => {
        // temporary - this filter should be removed in future;
        const result = FILTER_OUT_TEXT_TO_AUDIO_TASK
          ? filterTaskWithType(res, TEXT_TO_AUDIO_TASK_TYPE)
          : res;
        setMyTasksCount(result.length);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };
  useEffect(() => {
    setShowLoading(true);
    getAvailableTasks();
    getTaskSummary();
    getMyTasksList();
  }, []);

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };

  const assignTask = async (task) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignTask(userId, task.id)
      .then((result) => {
        history.push('/dashboard/tasks/perform-task/' + task.id);
        console.log(result);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const goToPerformTask = (e, task) => {
    assignTask(task);
  };

  const goToUploadImageTask = async ()=>{
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    try{
      let result = await apiService.createImageUploadTask();
      console.log(result)
      let res = await apiService.assignTask(userId,result.id);
      console.log(res)
      history.push('/dashboard/tasks/image-upload-task/' + res.taskId);
    }catch(err){
      console.log(err)
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
          </IonButtons> */}
          <IonTitle className="ion-text-center">{t(`dcag.tasks.page.heading`)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-start">
        <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} />
        <div className="tasks-info" style={{ marginTop: '30px' }}>
          <div className="task-detail">
            <div style={{ color: '#5e5e5e' }}>
              <IonIcon icon={people} /> {t(`dcag.tasks.page.completedTask.label`)}
            </div>
            <div style={{ fontSize: '2rem' }}>{completedCount}</div>
          </div>
          <div className="vertical-bar" style={{ borderLeft: '2px solid #ddd' }}></div>
          <div className="task-count">
            <div style={{ color: '#5e5e5e' }}>
              <IonIcon icon={business} /> {t(`dcag.tasks.page.youEarned.label`)}
            </div>
            <div style={{ fontSize: '2rem' }}>${totalEarned}</div>
          </div>
        </div>
        <IonSegment
          color="default"
          value={selectedSegment}
          className="tasks-tab"
          onIonChange={(e) => setSelectedSegment(e.detail.value)}>
          <IonSegmentButton
            value="available_task"
            className={
              selectedSegment === 'available_task' ? 'tasks-tab-content capitalize' : 'capitalize'
            }>
            <div className="mytask-segment-content">
              <div className="mytask-segment-text">
                {' '}
                {t(`dcag.tasks.tabs.availableTask.label`)}{' '}
              </div>
              {availableCount > 0 && (
                <IonBadge className="mytask-segmnet-badge">{availableCount}</IonBadge>
              )}
            </div>
          </IonSegmentButton>
          <IonSegmentButton
            value="my_tasks"
            className={
              selectedSegment === 'my_tasks' ? 'tasks-tab-content capitalize' : 'capitalize'
            }>
            {' '}
            <div className="mytask-segment-content">
              <div className="mytask-segment-text"> {t(`dcag.tasks.tabs.myTask.label`)} </div>
              {myTasksCount > 0 && (
                <IonBadge className="mytask-segmnet-badge">{myTasksCount}</IonBadge>
              )}
            </div>
          </IonSegmentButton>
          {/* Add more segments as needed */}
        </IonSegment>
        {selectedSegment === 'available_task' && (
          <React.Fragment>
            <React.Fragment>
              {Object.keys(tasks).map((key, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="ion-padding">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                        <h1 style={{ margin: '0', marginBottom: '-4px' }}>
                          {t(`dcag.tasks.${key}.title`)}
                        </h1>
                        {/* <span style={{ color: "#467ff4" }}>
                          {tasks[key].length} {t(`dcag.home.btn.new.label`)}
                        </span> */}
                      </div>

                      <p style={{ margin: '0' }}>
                        <small>{t(`dcag.tasks.${key}.taskDesc`)}</small>
                      </p>
                    </div>
                    {tasks[key].map((task, index) => {
                      return (
                        <React.Fragment>
                          <IonList key={task.id}>
                            <IonItem>
                              <IonLabel>
                                <span style={{ display: 'flex' }}>
                                  <h2>{task.name} </h2>
                                  {/* <IonBadge
                                    color="primary"
                                    className={`status-text-new`}
                                  >
                                    {t(
                                      `dcag.home.taskHub.status.${task.status}`
                                    )}
                                  </IonBadge> */}
                                </span>{' '}
                                <p>
                                  {t(`dcag.tasks.payouts.label`)}: ${task.price}
                                </p>
                                <p>
                                  <small>
                                    {t(`dcag.tasks.createdAt.label`)}:{' '}
                                    {formatDate(task.createDateTime)}{' '}
                                    {t(`dcag.tasks.dueDate.label`)}: {formatDate(task.dueDateTime)}
                                  </small>
                                </p>
                              </IonLabel>
                              <IonButton
                                slot="end"
                                style={{
                                  '--background': 'black',
                                  '--border-radius': '10px'
                                }}
                                onClick={(e) => goToPerformTask(e, task)}>
                                {t(`dcag.home.btn.startWork.label`)}
                              </IonButton>
                            </IonItem>
                            {/* Add more IonItem elements as needed */}
                          </IonList>
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
            <>
            <div className="ion-padding">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                        <h1 style={{ margin: '0', marginBottom: '-4px' }}>
                         {t(`dcag.tasks.performTask.uploadImage.label`)}
                        </h1>
                        {/* <span style={{ color: "#467ff4" }}>
                          {tasks[key].length} {t(`dcag.home.btn.new.label`)}
                        </span> */}
                      </div>

                      <p style={{ margin: '0' }}>
                        <small>{t(`dcag.tasks.UPLOAD_IMAGE.taskDesc`)}.</small>
                      </p>
            </div>
            <IonList>
              <IonItem>
                <IonLabel>
                  <span style={{ display: 'flex' }}>
                    <h2>Default Task</h2>
                    </span>
                    <p>
                                  {t(`dcag.tasks.payouts.label`)}: $2
                                </p>
               </IonLabel>
                    <IonButton
                                slot="end"
                                style={{
                                  '--background': 'black',
                                  '--border-radius': '10px'
                                }}
                                onClick={()=>goToUploadImageTask()}>
                                {t(`dcag.home.btn.startWork.label`)}
                    </IonButton>
                
              </IonItem>
            </IonList>
            </>
            
          </React.Fragment>
        )}

        {selectedSegment === 'my_tasks' && (
          <React.Fragment>
            <MyTasks />
          </React.Fragment>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
