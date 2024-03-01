import React from 'react';
import TaskSkeletonRow from './TaskSkeletonRow';

const TasksSkeleton: React.FC = () => {
  return (
    <div style={{ margin: '20px 0' }}>
      <TaskSkeletonRow />
      <TaskSkeletonRow />
      <TaskSkeletonRow />
      <TaskSkeletonRow />
      <TaskSkeletonRow />
      <TaskSkeletonRow />
      <TaskSkeletonRow />
      <TaskSkeletonRow />
      <TaskSkeletonRow />
      <TaskSkeletonRow />
    </div>
  );
};

export default TasksSkeleton;
