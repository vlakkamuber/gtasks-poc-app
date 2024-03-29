import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import React from 'React';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils';
import { chevronForward } from 'ionicons/icons';
import { Badge, COLOR } from 'baseui/badge';
import { useHistory } from 'react-router';
import { showPayout } from '../../constants/flags';
import { taskTypeMapperRoute } from '../../constants/constant';
import { TagFilled } from '@uber/icons';

const MyTaskCard = ({ task }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const statusBadgeColor = task.status === 'COMPLETED' ? COLOR.positive : COLOR.accent;
  const goToPerformTask = (e, task) => {
    if (task.taskType === 'UPLOAD_IMAGE') {
      history.push(taskTypeMapperRoute[task.taskType] + task.taskId);
    } else {
      history.push(taskTypeMapperRoute[task.taskType] + task.taskId);
    }
  };
  return (
    <>
      <IonItem onClick={(e) => goToPerformTask(e, task)} className="clickable-cursor">
        <IonLabel>
          <h2>{`Task #${task.taskId}`}</h2>
          {/* <p style={{color:'#048848'}}>{t(`dcag.home.taskHub.status.${task.status}`)}</p> */}
          {showPayout && (
            <p>
              <TagFilled color={'#0E8345'} style={{ marginRight: 4 }} /> ₹{task.price}
            </p>
          )}
          {/* <p>
            <small>
              {t(`dcag.tasks.createdAt.label`)}: {formatDate(task.createDateTime)}{' '}
              {t(`dcag.tasks.dueDate.label`)}: {task.dueDateTime ? formatDate(task.dueDateTime) : '-'}
            </small>
          </p> */}
        </IonLabel>
        <IonIcon icon={chevronForward} className="clickable-cursor" color="primary"></IonIcon>
      </IonItem>
    </>
  );
};

export default MyTaskCard;
