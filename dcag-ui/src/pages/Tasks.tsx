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
import { filterTaskWithType, formatDate,filterTaskWithStatus,filterTaskWithSelectedCategory,orderTasksByType } from '../utils/mapTeluguDigitsToNumeric';
import LoadingComponent from '../components/Loader';
import { FILTER_OUT_TEXT_TO_AUDIO_TASK, TEXT_TO_AUDIO_TASK_TYPE } from '../constants/contant';
import { useUserAuth } from '../context/UserAuthContext';
import { useCategory } from '../context/TaskCategoryContext';
import { Badge, COLOR } from 'baseui/badge';
import {showPayout} from "../utils/Settings"
import ErrorView from '../components/ErrorView';

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const [selectedSegment, setSelectedSegment] = useState('available_task');
  const [tasks, setTasks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [myTasksCount, setMyTasksCount] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();
  const { user } = useUserAuth();
  const { selectedCategory } = useCategory();
  const [isImageUploadAvailable,setIsImageUploadAvailable] = useState(false)
  const [finalTasks,setFinalTasks] = useState([])

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
  const getAvailableTasks = async () => {
    try {
      setShowLoading(true);
      setIsError(false);
      const userId = JSON.parse(localStorage.getItem('loggedInUser'));
      const myTasks = await apiService.getMyTasksList({ userId, user, status: "IN_PROGRESS" });
      const myCompletedTasks = await apiService.getMyTasksList({ userId, user, status: "COMPLETED" });
      setMyTasksCount(myCompletedTasks.length);

      let availableTasks = [];

      if (selectedCategory === "ALL") {
        const categories = ["AUDIO_TO_AUDIO", "IMAGE_TO_TEXT", "UPLOAD_IMAGE", "TEXT_TO_AUDIO"];

        // Fetch tasks for each category concurrently
        const tasksPromises = categories.map(category =>
          apiService.getAvailableTasks({ userId, user, selectedCategory: category })
        );

        const categoryTasks = await Promise.all(tasksPromises);
        availableTasks = [...myTasks, ...categoryTasks.flat()];
      } else {
        availableTasks = await apiService.getAvailableTasks({ userId, user, selectedCategory });
      }

      setShowLoading(false);
      setIsError(false);

      const filteredMyTasks = filterTaskWithSelectedCategory(myTasks, selectedCategory);
      const isImageUploadAvailable = myTasks.some(task => task.taskType === "UPLOAD_IMAGE");
      setIsImageUploadAvailable(isImageUploadAvailable)

      const finalTaskList = [...filteredMyTasks, ...availableTasks];

      setFinalTasks(finalTaskList);
      // Temporary - this filter should be removed in the future;
      const result = FILTER_OUT_TEXT_TO_AUDIO_TASK
        ? filterTaskWithType(finalTaskList, TEXT_TO_AUDIO_TASK_TYPE)
        : finalTaskList;
     const orderedTasks = orderTasksByType(result, ["AUDIO_TO_AUDIO", "IMAGE_TO_TEXT", "UPLOAD_IMAGE", "TEXT_TO_AUDIO"]);
      setAvailableCount(orderedTasks.length);
      setTasks(groupBy(orderedTasks, 'taskType'));
    } catch (error) {
      setShowLoading(false);
      setIsError(true);
      console.error('Error fetching task data:', error);
      // Handle the error accordingly
    }
  };

  const getTaskSummary = () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskSummary({userId, user})
      .then((result) => {
        console.log(result);
        setCompletedCount(result.completedTaskCount);
        setTotalEarned(result.totalEarning);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  // const getMyTasksList = () => {
  //   let userId = JSON.parse(localStorage.getItem('loggedInUser'));
  //   apiService
  //     .getMyTasksList({ userId, user })
  //     .then((res) => {
  //       let myComopletedTasks = filterTaskWithStatus(res, "COMPLETED")
  //       // temporary - this filter should be removed in future;
  //       const result = FILTER_OUT_TEXT_TO_AUDIO_TASK
  //         ? filterTaskWithType(myComopletedTasks, TEXT_TO_AUDIO_TASK_TYPE)
  //         : myComopletedTasks;
  //       setMyTasksCount(result.length);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching task data:', error);
  //     });
  // };
  useEffect(() => {
    setShowLoading(true);
    getAvailableTasks();
    getTaskSummary();
    //getMyTasksList();
  }, []);

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };

  const assignTask = async (task) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignTask({ userId, taskId: task.id, user })
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

  const goToPerformResumeWork = (e,task)=>{
    history.push('/dashboard/tasks/perform-task/' + task.taskId);
  }

  const goToUploadImageTask = async ()=>{
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    try{
      let result = await apiService.createImageUploadTask({ user });
      console.log(result)
      let res = await apiService.assignTask({userId, taskId: result.id, user});
      console.log(res)
      history.push('/dashboard/tasks/image-upload-task/' + res.taskId);
    }catch(err){
      console.log(err)
    }
  }

  const findUniqueTasks = (finalTasks:any,tasks:any)=>{
    // Use an object to keep track of seen IDs
    const uniqueTaskIds = {};

    // Combine the arrays while ensuring unique tasks based on ID
    const finalTaskList = [...finalTasks, ...tasks].reduce((accumulator, task) => {
      if (!uniqueTaskIds[task.id]) {
        uniqueTaskIds[task.id] = true;
        accumulator.push(task);
      }
      return accumulator;
    }, []);
    return finalTaskList
  }

  const loadMore = async (key)=>{
    setShowLoading(true);
    const userId = JSON.parse(localStorage.getItem('loggedInUser'));
    let tasks = await apiService.getAvailableTasks({ userId, user, selectedCategory:key });
    const finalTaskList = findUniqueTasks(finalTasks,tasks)
    setFinalTasks(finalTaskList);
      // Temporary - this filter should be removed in the future;
      const result = FILTER_OUT_TEXT_TO_AUDIO_TASK
        ? filterTaskWithType(finalTaskList, TEXT_TO_AUDIO_TASK_TYPE)
        : finalTaskList;
      const orderedTasks = orderTasksByType(result, ["AUDIO_TO_AUDIO", "IMAGE_TO_TEXT", "UPLOAD_IMAGE", "TEXT_TO_AUDIO"]);

      setAvailableCount(orderedTasks.length);
      setTasks(groupBy(orderedTasks, 'taskType'));
      setShowLoading(false);
  }
  if (isError) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">{t(`dcag.tasks.page.heading`)}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding-start" style={{'--padding-bottom': '77px'}}>
          <ErrorView />
        </IonContent>
    </IonPage>
    );
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
      <IonContent className="ion-padding-start" style={{'--padding-bottom': '77px'}}>
        <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} />
        {showPayout && <div className="tasks-info" style={{ marginTop: '30px' }}>
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
        </div>}
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
                        <React.Fragment key={task.id}>
                          <IonList>
                            <IonItem>
                              <IonLabel>
                                <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                  <h2>{task.name || task.taskName} </h2>
                                  {(task.userId && task.status==='IN_PROGRESS') &&<Badge
                                  content={t(`dcag.home.taskHub.status.${task.status}`)}
                                  color={COLOR.accent}
                                  />}
                                </span>{' '}
                                {showPayout && <p>
                                  {t(`dcag.tasks.payouts.label`)}: ${task.price}
                                </p>}
                                {/* <p>
                                  <small>
                                    {t(`dcag.tasks.createdAt.label`)}:{' '}
                                    {formatDate(task.createDateTime)}{' '}
                                    {t(`dcag.tasks.dueDate.label`)}: {formatDate(task.dueDateTime)}
                                  </small>
                                </p> */}
                              </IonLabel>
                              {!task.userId && <IonButton
                                slot="end"
                                style={{
                                  '--background': 'black',
                                  '--border-radius': '10px'
                                }}
                                onClick={(e) => goToPerformTask(e, task)}>
                                {t(`dcag.home.btn.startWork.label`)}
                              </IonButton>}
                             {task.userId && task.status==='IN_PROGRESS' && <IonButton
                                slot="end"
                                style={{
                                  '--background': 'black',
                                  '--border-radius': '10px'
                                }}
                                onClick={(e) => goToPerformResumeWork(e, task)}>
                                {t(`dcag.home.btn.resumeWork.label`)}
                              </IonButton>}
                            </IonItem>
                            {/* Add more IonItem elements as needed */}
                          </IonList>

                        </React.Fragment>

                      );
                    })}
                  <div style={{ display: 'flex', justifyContent: 'right',cursor:'pointer' }}>
                    <span style={{fontSize:'1rem',fontWeight:'normal',marginRight:'12px',textDecoration:'underline',color:'#0000EE'}} onClick={() => loadMore(key)}>{t(`dcag.home.btn.loadMore.label`)}
                    </span>
                  </div>

                  </React.Fragment>
                );

              })}
            </React.Fragment>
            {((selectedCategory==="UPLOAD_IMAGE"  || selectedCategory==="ALL") && isImageUploadAvailable===false) &&<>
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
                        {showPayout && <p>
                                      {t(`dcag.tasks.payouts.label`)}: $2
                                    </p>}
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
            </>}

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
