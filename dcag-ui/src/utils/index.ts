import { COMPLETED_TASK_STATUS, IN_PROGRESS_TASK_STATUS } from '../constants/constant';
import type { Task } from '../types/tasks-types';

export function mapTeluguDigitsToNumeric(inputText) {
  const teluguDigitsMap = {
    '౦': '0',
    '౧': '1',
    '౨': '2',
    '౩': '3',
    '౪': '4',
    '౫': '5',
    '౬': '6',
    '౭': '7',
    '౮': '8',
    '౯': '9'
  };

  // Replace Telugu digits with corresponding numeric digits
  return inputText.replace(/[౦-౯]/g, (match) => teluguDigitsMap[match]);
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

export const filterTaskWithType = (tasks: Task[], taskType: string): Task[] => {
  return tasks.filter((task) => task.taskType !== taskType);
};

export const filterTaskWithSelectedCategory = (tasks: Task[], taskType: string): Task[] => {
  return tasks.filter((task) => task.taskType === taskType);
};

export const filterTaskWithStatus = (tasks: { status: string }[], status: string) => {
  return tasks.filter((task) => task.status === status);
};

export const getSortedInProgressTaskList = (taskList) => {
  return taskList
    .filter((task) => task.status === IN_PROGRESS_TASK_STATUS)
    .sort((a, b) => b.startTime - a.startTime);
};

export const getSortedCompletedTaskList = (taskList) => {
  return taskList
    .filter((task) => task.status === COMPLETED_TASK_STATUS)
    .sort((a, b) => b.completedTime - a.completedTime);
};

export function orderTasksByType(tasks, taskTypeOrder) {
  // Create a map to store tasks based on their type
  const tasksByType = {};

  // Initialize the map with empty arrays for each task type
  taskTypeOrder.forEach((type) => {
    tasksByType[type] = [];
  });

  // Group tasks by their type
  tasks.forEach((task) => {
    if (tasksByType.hasOwnProperty(task.taskType)) {
      tasksByType[task.taskType].push(task);
    } else {
      // Handle unknown task types (if necessary)
      console.warn(`Unknown task type: ${task.taskType}`);
    }
  });

  // Flatten the grouped tasks back into a single array following the specified order
  const orderedTasks = taskTypeOrder.reduce((accumulator, type) => {
    return accumulator.concat(tasksByType[type]);
  }, []);

  return orderedTasks;
}

export const snakeCaseToNormal = (snakeCaseString) => {
  const words = snakeCaseString.split('_');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
};

export function to2DecimalPlaces(num: number): string {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getSessionId(userId: string): string {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = userId + Date.now();
    sessionStorage.setItem('sessionId', sessionId);
  }

  return sessionId;
}
