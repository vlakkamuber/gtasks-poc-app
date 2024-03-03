import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonBadge } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import MyTasks from './MyTasks';
import { useTranslation } from 'react-i18next';
import apiService from '../../BE-services/apiService';
import { taskTypeMapperRoute, ANALYTICS_PAGE } from '../../constants/constant';
import { useUserAuth } from '../../context/UserAuthContext';
import { useCategory } from '../../context/TaskCategoryContext';
import { showPayout } from '../../constants/flags';
import EmptyPageWithLoader from './components/EmptyPageWithLoader';
import useAnalytics from '../../hooks/useAnanlytics';
import SurveyModal from './SurveyModal';
import { LabelSmall } from 'baseui/typography';
import PageHeader from '../../components/PageHeader/PageHeader';
import AvailableTasksSegment from './components/AvailableTasksSegment';
import PayoutCards from './components/PayoutCards';
import type { Task, goToPerformTaskFunctionType } from '../../types/tasks-types';

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const [selectedSegment, setSelectedSegment] = useState('available_task');
  const [isError, setIsError] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();
  const { user } = useUserAuth();
  const { selectedCategory, location } = useCategory();
  const [isImageUploadAvailable, setIsImageUploadAvailable] = useState<boolean>(false);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [todayEarnings, setTodayEarnings] = useState(0);
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
      setMyTasks(myTasks);

      setShowLoading(false);
      setIsError(false);

      const isImageUploadAvailable = myTasks.some((task) => task.taskType === 'UPLOAD_IMAGE');
      setIsImageUploadAvailable(isImageUploadAvailable);
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
  }, [selectedCategory]);

  const assignTask = async (task: Task) => {
    const userId = JSON.parse(localStorage.getItem('loggedInUser'));
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
    const userId = JSON.parse(localStorage.getItem('loggedInUser'));
    try {
      const result = await apiService.createImageUploadTask({ user });
      console.log(result);
      const res = await apiService.assignTask({ userId, taskId: result.id, user });
      console.log(res);
      history.push('/dashboard/tasks/image-upload-task/' + res.taskId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabClick = (e) => {
    logEvent({ actions: 'click_tab', properties: e.detail.value });
    setSelectedSegment(e.detail.value);
  };

  if (isError) {
    return <EmptyPageWithLoader />;
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
              myTasks={myTasks}
              location={location}
              setIsError={setIsError}
              showLoading={showLoading}
              completedCount={completedCount}
              selectedCategory={selectedCategory}
              todayEarnings={todayEarnings}
              showPayout={showPayout}
              goToPerformTask={goToPerformTask}
              goToPerformResumeWork={goToPerformResumeWork}
              goToUploadImageTask={goToUploadImageTask}
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
