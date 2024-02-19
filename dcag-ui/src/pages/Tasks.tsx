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
  IonBadge,
  IonButtons
} from '@ionic/react';
import { people, business, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import MyTasks from './MyTasks';
import { useTranslation } from 'react-i18next';
import apiService from './apiService';
import {
  filterTaskWithType,
  filterTaskWithSelectedCategory,
  orderTasksByType,
  to2DecimalPlaces,
  capitalizeFirstLetter
} from '../utils/mapTeluguDigitsToNumeric';
import LoadingComponent from '../components/Loader';
import {
  FILTER_OUT_TEXT_TO_AUDIO_TASK,
  TEXT_TO_AUDIO_TASK_TYPE,
  taskTypeMapperRoute,
  taskCategoriesToShow,
  TasksOrder,
  TASK_RATE,
  ANALYTICS_PAGE,
  TaskOrderByLocation,
  TASK_CATEGORIES_DATA
} from '../constants/constant';
import { useUserAuth } from '../context/UserAuthContext';
import { useCategory } from '../context/TaskCategoryContext';
import { showPayout } from '../utils/Settings';
import ErrorView from '../components/ErrorView';
import { Button, SIZE, SHAPE } from 'baseui/button';
import useAnalytics from '../hooks/useAnanlytics';
import { useStyletron } from 'baseui';
import Card from './Tasks/components/Card';
import PersonMultipleFilled from '@uber/icons/person-multiple-filled';
import MoneyFilled from '@uber/icons/money-filled';
import SurveyModal from './SurveyQuestions/SurveyModal';
import { ParagraphSmall } from 'baseui/typography';
import LanguageSwitcher from './LanguageSwitcher';
import TaskSwitcher from '../components/TaskSwitcher';
import { TagFilled } from '@uber/icons';

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const [selectedSegment, setSelectedSegment] = useState('available_task');
  const [tasks, setTasks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [myTasksCount, setMyTasksCount] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();
  const { user } = useUserAuth();
  const { selectedCategory, location } = useCategory();
  const [isImageUploadAvailable, setIsImageUploadAvailable] = useState(false);
  const [finalTasks, setFinalTasks] = useState([]);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = useState(true);
  const [taskSummary, setTaskSummary] = useState(null);
  const selectedTaskType = TASK_CATEGORIES_DATA.find((item) => item.id === selectedCategory);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.tasks });

  useEffect(() => {
    logEvent({ actions: '' });
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
  const getAvailableTasks = async () => {
    try {
      setShowLoading(true);
      setIsError(false);
      const userId = JSON.parse(localStorage.getItem('loggedInUser'));
      const myTasks = await apiService.getMyTasksList({ userId, user, status: 'IN_PROGRESS' });
      const myCompletedTasks = await apiService.getMyTasksList({
        userId,
        user,
        status: 'COMPLETED'
      });
      setMyTasksCount(myCompletedTasks.length);

      let availableTasks = [];

      if (selectedCategory === 'ALL') {
        // Fetch tasks for each category concurrently
        const tasksPromises = Object.entries(taskCategoriesToShow)
          .filter(([category, value]) => value)
          .map(([category]) =>
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
      const isImageUploadAvailable = myTasks.some((task) => task.taskType === 'UPLOAD_IMAGE');
      setIsImageUploadAvailable(isImageUploadAvailable);

      const finalTaskList = [...filteredMyTasks, ...availableTasks];
      setFinalTasks(finalTaskList);
      // Temporary - this filter should be removed in the future;
      const result = FILTER_OUT_TEXT_TO_AUDIO_TASK
        ? filterTaskWithType(finalTaskList, TEXT_TO_AUDIO_TASK_TYPE)
        : finalTaskList;
      const orderedTasks = orderTasksByType(
        result,
        TaskOrderByLocation[location] || TaskOrderByLocation['OTHER']
      );
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
    setIsError(false);
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .getTaskSummary({ userId, user })
      .then((result) => {
        console.log(result);
        setCompletedCount(result.completedTaskCount);
        setTodayCount(result.todayCompletedTasks);
        setTotalEarned(result.totalEarning);
        setTodayEarnings(result.todayEarnings);
        setTaskSummary(result);
        if (result.todayEarnings < 200) {
          getAvailableTasks();
        } else {
          setShowLoading(false);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.error('Error fetching task data:', error);
      });
  };

  useEffect(() => {
    setShowLoading(true);
    getTaskSummary();
  }, []);
  useEffect(() => {
    setShowLoading(true);
    getTaskSummary();
  }, [selectedCategory]);

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };

  const assignTask = async (task) => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    apiService
      .assignTask({ userId, taskId: task.id, user })
      .then((result) => {
        history.push(taskTypeMapperRoute[task.taskType] + task.id);
        console.log(result);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const goToPerformTask = async (e, task) => {
    logEvent({
      actions: 'click_start_work',
      properties: task.id
    });
    assignTask(task);
  };

  const goToPerformResumeWork = (e, task) => {
    logEvent({
      actions: 'click_resume_work',
      properties: task.id
    });
    history.push(taskTypeMapperRoute[task.taskType] + task.taskId);
  };

  const goToUploadImageTask = async () => {
    let userId = JSON.parse(localStorage.getItem('loggedInUser'));
    try {
      let result = await apiService.createImageUploadTask({ user });
      console.log(result);
      let res = await apiService.assignTask({ userId, taskId: result.id, user });
      console.log(res);
      history.push('/dashboard/tasks/image-upload-task/' + res.taskId);
    } catch (err) {
      console.log(err);
    }
  };

  const findUniqueTasks = (finalTasks: any, tasks: any) => {
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
    return finalTaskList;
  };

  const handleTabClick = (e) => {
    logEvent({ actions: 'click_tab', properties: e.detail.value });
    setSelectedSegment(e.detail.value);
  };

  const loadMore = async (key) => {
    logEvent({ actions: 'click_load_more' });
    setShowLoading(true);
    const userId = JSON.parse(localStorage.getItem('loggedInUser'));
    let tasks = await apiService.getAvailableTasks({ userId, user, selectedCategory: key });
    const finalTaskList = findUniqueTasks(finalTasks, tasks);
    setFinalTasks(finalTaskList);
    // Temporary - this filter should be removed in the future;
    const result = FILTER_OUT_TEXT_TO_AUDIO_TASK
      ? filterTaskWithType(finalTaskList, TEXT_TO_AUDIO_TASK_TYPE)
      : finalTaskList;
    const orderedTasks = orderTasksByType(
      result,
      TaskOrderByLocation[location] || TaskOrderByLocation['OTHER']
    );

    setAvailableCount(orderedTasks.length);
    setTasks(groupBy(orderedTasks, 'taskType'));
    setShowLoading(false);
  };
  const taskLabel = capitalizeFirstLetter(t('dcag.home.text.task'));
  const selectedCategoryTitle = TASK_CATEGORIES_DATA.find(
    (item) => item.id === selectedCategory
  )?.title;
  if (isError) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{t(`dcag.tasks.page.heading`)}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding-start" style={{ '--padding-bottom': '77px' }}>
          <ErrorView />
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
          </IonButtons>
          <div style={{ display: 'flex', padding: '8px', justifyContent: 'end' }}>
            <IonTitle style={{ width: '80%' }}>{t(`dcag.tasks.page.heading`)}</IonTitle>
            <div style={{ width: '40%' }}>
              <LanguageSwitcher page={ANALYTICS_PAGE.tasks} />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-start" style={{ '--padding-bottom': '77px' }}>
        {completedCount > 100 && !taskSummary?.surveyStatus && (
          <SurveyModal isOpen={isOpen} onClose={closeModal} />
        )}
        <LoadingComponent showLoading={showLoading} onHide={() => setShowLoading(false)} />
        {showPayout && (
          <div className="tasks-info" style={{ marginTop: '30px' }}>
            <Card
              className="task-detail"
              icon={people}
              TitleIcon={() => (
                <PersonMultipleFilled size={16} color="#276EF1" style={{ marginRight: 8 }} />
              )}
              bgColor="#EFF4FE"
              label={t(`dcag.tasks.page.completedTask.label`)}
              count={completedCount}
              todayCount={todayCount}
            />
            <Card
              className="task-count"
              icon={business}
              TitleIcon={() => <MoneyFilled size={16} color="#0E8345" style={{ marginRight: 8 }} />}
              bgColor="#EAF6ED"
              label={t(`dcag.tasks.page.youEarned.label`)}
              count={`₹${to2DecimalPlaces(totalEarned)}`}
              todayCount={`₹${to2DecimalPlaces(todayEarnings)}`}
            />
          </div>
        )}
        <IonSegment
          color="default"
          value={selectedSegment}
          className="tasks-tab"
          onIonChange={handleTabClick}>
          <IonSegmentButton
            value="available_task"
            className={
              selectedSegment === 'available_task'
                ? 'tasks-tab-content capitalize task-tab-link'
                : 'capitalize task-tab-link'
            }>
            <div className="mytask-segment-content">
              <div className="mytask-segment-text">
                {' '}
                {t(`dcag.tasks.tabs.availableTask.label`)}{' '}
              </div>
            </div>
          </IonSegmentButton>
          <IonSegmentButton
            value="my_tasks"
            className={
              selectedSegment === 'my_tasks'
                ? 'tasks-tab-content capitalize task-tab-link'
                : 'capitalize task-tab-link'
            }>
            {' '}
            <div className="mytask-segment-content">
              <div className="mytask-segment-text"> {t(`dcag.tasks.tabs.myTask.label`)} </div>
              {completedCount > 0 && (
                <IonBadge className="mytask-segmnet-badge">{completedCount}</IonBadge>
              )}
            </div>
          </IonSegmentButton>
          {/* Add more segments as needed */}
        </IonSegment>

        {selectedSegment === 'available_task' && (
          <React.Fragment>
            {!availableCount && !showLoading && (
              <div>
                <ParagraphSmall>
                  {completedCount
                    ? t('dcag.tasks.text.all_task_completed')
                    : t('dcag.tasks.text.no_more_task')}{' '}
                  {selectedCategoryTitle} {t('dcag.tasks.text.continue_other_task')}
                </ParagraphSmall>
              </div>
            )}
            {todayEarnings > 200 ? (
              <AlertInfoCard message="You reached the daily earning limit of Rs.200! Please continue tomorrow!" />
            ) : (
              <>
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
                              {(location === 'HYDERABAD' || location === 'CHENNAI') &&
                              (key === 'IMAGE_LABELLING' || key === 'MENU_PHOTO_REVIEW')
                                ? t(`dcag.tasks.${key}.CHENNAI_HYD.title`)
                                : t(`dcag.tasks.${key}.title`)}
                            </h1>
                            {selectedCategory !== 'ALL' && (
                              <span>
                                <TaskSwitcher />
                              </span>
                            )}
                            {/* <span style={{ color: "#467ff4" }}>
                          {tasks[key].length} {t(`dcag.home.btn.new.label`)}
                        </span> */}
                          </div>

                          <p style={{ margin: '0' }}>
                            {availableCount === 0 ? (
                              <small>
                                {completedCount > 0
                                  ? t('dcag.tasks.text.all_task_completed')
                                  : t('dcag.tasks.text.no_more_task')}{' '}
                                {selectedTaskType?.title}.{' '}
                                {t('dcag.tasks.text.continue_other_task')}
                              </small>
                            ) : (
                              <small>{t(`dcag.tasks.${key}.taskDesc`)}</small>
                            )}
                          </p>
                        </div>

                        {tasks[key].map((task, index) => {
                          return (
                            <React.Fragment key={task.id}>
                              <IonList>
                                <IonItem>
                                  <IonLabel>
                                    <h2>
                                      {task.status === 'IN_PROGRESS'
                                        ? `${taskLabel} #${task.taskId}`
                                        : `${taskLabel} #${task.id}`}
                                    </h2>
                                    {task.userId && task.status === 'IN_PROGRESS' && (
                                      <p style={{ color: '#276ef1' }}>
                                        {t(`dcag.home.taskHub.status.${task.status}`)}
                                      </p>
                                    )}
                                    {showPayout && (
                                      <p>
                                        <TagFilled color={'#0E8345'} style={{ marginRight: 4 }} /> ₹
                                        {to2DecimalPlaces(TASK_RATE[key])}
                                      </p>
                                    )}
                                  </IonLabel>
                                  {!task.userId && (
                                    <Button
                                      onClick={(e) => goToPerformTask(e, task)}
                                      size={SIZE.compact}
                                      shape={SHAPE.pill}>
                                      {t(`dcag.home.btn.startWork.label`)}
                                    </Button>
                                  )}
                                  {task.userId && task.status === 'IN_PROGRESS' && (
                                    <Button
                                      onClick={(e) => goToPerformResumeWork(e, task)}
                                      size={SIZE.compact}
                                      shape={SHAPE.pill}>
                                      {t(`dcag.home.btn.resumeWork.label`)}
                                    </Button>
                                  )}
                                </IonItem>
                                {/* Add more IonItem elements as needed */}
                              </IonList>
                            </React.Fragment>
                          );
                        })}
                        <div
                          style={{ display: 'flex', justifyContent: 'right', cursor: 'pointer' }}>
                          <span
                            style={{
                              fontSize: '1rem',
                              fontWeight: 'normal',
                              marginRight: '12px',
                              textDecoration: 'underline',
                              color: '#0000EE'
                            }}
                            onClick={() => loadMore(key)}>
                            {t(`dcag.home.btn.loadMore.label`)}
                          </span>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
                {taskCategoriesToShow.UPLOAD_IMAGE === true && isImageUploadAvailable === false && (
                  <>
                    <div className="ion-padding">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                        <h1 style={{ margin: '0', marginBottom: '-4px' }}>
                          {t(`dcag.tasks.UPLOAD_IMAGE.title`)}
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
                          {showPayout && <p><TagFilled color={'#0E8345'} style={{ marginRight: 4 }} /> $2</p>}
                        </IonLabel>
                        <IonButton
                          slot="end"
                          style={{
                            '--background': 'black',
                            '--border-radius': '10px'
                          }}
                          onClick={() => goToUploadImageTask()}>
                          {t(`dcag.home.btn.startWork.label`)}
                        </IonButton>
                      </IonItem>
                    </IonList>
                  </>
                )}
              </>
            )}
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
