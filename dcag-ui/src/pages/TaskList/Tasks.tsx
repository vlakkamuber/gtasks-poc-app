import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonBadge
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import MyTasks from './MyTasks';
import { useTranslation } from 'react-i18next';
import apiService from '../../BE-services/apiService';
import { filterTaskWithType, filterTaskWithSelectedCategory, orderTasksByType } from '../../utils';
import {
  FILTER_OUT_TEXT_TO_AUDIO_TASK,
  TEXT_TO_AUDIO_TASK_TYPE,
  taskTypeMapperRoute,
  taskCategoriesToShow,
  ANALYTICS_PAGE,
  TaskOrderByLocation
} from '../../constants/constant';
import { useUserAuth } from '../../context/UserAuthContext';
import { useCategory } from '../../context/TaskCategoryContext';
import { showPayout } from '../../constants/flags';
import ErrorView from '../../components/ErrorView';
import useAnalytics from '../../hooks/useAnanlytics';
import { useStyletron } from 'baseui';
import SurveyModal from './SurveyModal';
import { LabelSmall } from 'baseui/typography';
import PageHeader from '../../components/PageHeader/PageHeader';
import AvailableTasksSegment from './components/AvailableTasksSegment';
import PayoutCards from './components/PayoutCards';
import type { goToPerformTaskFunctionType } from '../../types/tasks-types';

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const [selectedSegment, setSelectedSegment] = useState('available_task');
  const [tasks, setTasks] = useState({});
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

  const goToPerformTask: goToPerformTaskFunctionType = (e, task) => {
    logEvent({
      actions: 'click_start_work',
      properties: task.id
    });
    assignTask(task);
  };

  const goToPerformResumeWork: goToPerformTaskFunctionType = (e, task) => {
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
      <IonContent style={{ '--padding-bottom': '77px' }}>
        <PageHeader page={ANALYTICS_PAGE.tasks} title={t(`dcag.tasks.page.heading`)} />
        <div style={{ padding: 10 }}>
          {completedCount > 100 && !taskSummary?.surveyStatus && (
            <SurveyModal isOpen={isOpen} onClose={closeModal} />
          )}
          {showPayout && (
            <PayoutCards
              todayCount={todayCount}
              completedCount={completedCount}
              todayEarnings={todayEarnings}
              totalEarned={totalEarned}
            />
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
                  <LabelSmall>{t(`dcag.tasks.tabs.availableTask.label`)}</LabelSmall>
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
                <div className="mytask-segment-text">
                  <LabelSmall>{t(`dcag.tasks.tabs.myTask.label`)} </LabelSmall>
                </div>
                {completedCount > 0 && (
                  <IonBadge className="mytask-segmnet-badge">{completedCount}</IonBadge>
                )}
              </div>
            </IonSegmentButton>
            {/* Add more segments as needed */}
          </IonSegment>

          {selectedSegment === 'available_task' && (
            <AvailableTasksSegment
              tasks={tasks}
              location={location}
              availableCount={availableCount}
              showLoading={showLoading}
              completedCount={completedCount}
              selectedCategory={selectedCategory}
              todayEarnings={todayEarnings}
              showPayout={showPayout}
              goToPerformTask={goToPerformTask}
              goToPerformResumeWork={goToPerformResumeWork}
              loadMore={loadMore}
              goToUploadImageTask={goToUploadImageTask}
              taskCategoriesToShow={taskCategoriesToShow}
              isImageUploadAvailable={isImageUploadAvailable}
            />
          )}

          {selectedSegment === 'my_tasks' && (
            <React.Fragment>
              <MyTasks />
            </React.Fragment>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
