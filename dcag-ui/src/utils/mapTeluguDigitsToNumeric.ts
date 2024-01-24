import { COMPLETED_TASK_STATUS, IN_PROGRESS_TASK_STATUS } from '../constants/contant';

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

export const filterTaskWithType = (tasks: { taskType: string }[], taskType: string) => {
  return tasks.filter((task) => task.taskType !== taskType);
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
