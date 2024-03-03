import React, { useEffect, useState } from 'react';
import TaskListRow from './TaskListRow';
import TasksSkeleton from '../TasksSkeleton';
import type { Task, goToPerformTaskFunctionType } from '../../../types/tasks-types';
import { useUserAuth } from '../../../context/UserAuthContext';
import apiService from '../../../BE-services/apiService';
import { filterTaskWithSelectedCategory, filterTaskWithType } from '../../../utils';
import { useCategory } from '../../../context/TaskCategoryContext';
import LoadMoreButton from './LoadMoreButton';
import useAnalytics from '../../../hooks/useAnanlytics';
import {
  ANALYTICS_PAGE,
  FILTER_OUT_TEXT_TO_AUDIO_TASK,
  TEXT_TO_AUDIO_TASK_TYPE
} from '../../../constants/constant';

const findUniqueTasks = (finalTasks: Task[], tasks: Task[]): Task[] => {
  // Use an object to keep track of seen IDs
  const uniqueTaskIds: Record<string, boolean> = {};

  // Combine the arrays while ensuring unique tasks based on ID
  const finalTaskList = [...finalTasks, ...tasks].reduce((accumulator: Task[], task) => {
    if (!uniqueTaskIds[task.id]) {
      uniqueTaskIds[task.id] = true;
      accumulator.push(task);
    }
    return accumulator;
  }, []);
  return finalTaskList;
};

const TaskList: React.FC<{
  myTasks: Task[];
  category: string;
  showPayout: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailableCount: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  goToPerformTask: goToPerformTaskFunctionType;
  goToPerformResumeWork: goToPerformTaskFunctionType;
}> = ({
  myTasks,
  category,
  showPayout,
  setIsError,
  setAvailableCount,
  goToPerformTask,
  goToPerformResumeWork
}) => {
  const [showLoading, setShowLoading] = useState(false);
  const { selectedCategory } = useCategory();
  const { user } = useUserAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);

  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.tasks });

  const loadMore = async (key: string): Promise<void> => {
    logEvent({ actions: 'click_load_more' });
    setShowLoading(true);
    const userId = JSON.parse(localStorage.getItem('loggedInUser'));
    const newTasks: Task[] = await apiService.getAvailableTasks({
      userId,
      user,
      selectedCategory: key
    });
    const newTasksList = findUniqueTasks(tasks, newTasks);
    setTasks(newTasksList);

    setAvailableCount((availableCount: Record<string, number>) => ({
      ...availableCount,
      [selectedCategory]: tasks.length
    }));
    setShowLoading(false);
  };

  useEffect(() => {
    (async () => {
      setShowLoading(true);
      const userId = JSON.parse(localStorage.getItem('loggedInUser'));

      const availableTasks = await apiService.getAvailableTasks({
        userId,
        user,
        selectedCategory
      });

      setAvailableTasks(availableTasks);

      setShowLoading(false);
      setIsError(false);
    })();
  }, [selectedCategory]);

  useEffect(() => {
    (async () => {
      const filteredMyTasks = filterTaskWithSelectedCategory(myTasks, selectedCategory);

      let finalTaskList: Task[] = [...filteredMyTasks, ...availableTasks];

      // Temporary - this filter should be removed in the future;
      finalTaskList = FILTER_OUT_TEXT_TO_AUDIO_TASK
        ? filterTaskWithType(finalTaskList, TEXT_TO_AUDIO_TASK_TYPE)
        : finalTaskList;

      setAvailableCount((availableCount: Record<string, number>) => ({
        ...availableCount,
        [selectedCategory]: finalTaskList.length
      }));
      setTasks(finalTaskList);
    })();
  }, [selectedCategory, availableTasks, myTasks]);

  return showLoading ? (
    <TasksSkeleton />
  ) : (
    <>
      {tasks.map((task: Task) => {
        return (
          <TaskListRow
            key={task.id}
            task={task}
            showPayout={showPayout}
            category={category}
            goToPerformTask={goToPerformTask}
            goToPerformResumeWork={goToPerformResumeWork}
          />
        );
      })}
      <LoadMoreButton loadMore={loadMore} taskKey={category} />
    </>
  );
};

export default TaskList;
