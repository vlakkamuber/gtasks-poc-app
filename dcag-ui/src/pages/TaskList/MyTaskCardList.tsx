import { IonList } from '@ionic/react';
import React from 'react';
import MyTaskCard from './MyTaskCard';
import { getSortedCompletedTaskList, getSortedInProgressTaskList } from '../../utils';

const MyTaskCardList = ({ taskList }) => {
  const inProgressTaskList = getSortedInProgressTaskList(taskList);
  const completedTaskList = getSortedCompletedTaskList(taskList);
  const sortedTaskList = [...inProgressTaskList, ...completedTaskList];
  return (
    <IonList>
      {sortedTaskList.map((task) => (
        <MyTaskCard key={task.id} task={task} />
      ))}
    </IonList>
  );
};

export default MyTaskCardList;
