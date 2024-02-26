import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import { TagFilled } from '@uber/icons';
import { to2DecimalPlaces } from '../../../utils';
import { Button, SHAPE, SIZE } from 'baseui/button';
import { TASK_RATE } from '../../../constants/constant';
import { useTranslation } from 'react-i18next';

const TaskListRow: React.FC = ({
  task,
  taskKey: key,
  taskLabel,
  showPayout,
  goToPerformTask,
  goToPerformResumeWork
}) => {
  const { t } = useTranslation();

  return (
    <React.Fragment key={task.id}>
      <IonList style={{ marginBottom: 1 }}>
        <IonItem>
          <IonLabel>
            <h2>
              {task.status === 'IN_PROGRESS'
                ? `${taskLabel} #${task.taskId}`
                : `${taskLabel} #${task.id}`}
            </h2>
            {task.userId && task.status === 'IN_PROGRESS' && (
              <p style={{ color: '#276ef1' }}>{t(`dcag.home.taskHub.status.${task.status}`)}</p>
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
};

export default TaskListRow;
