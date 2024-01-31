import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import react from 'React';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/mapTeluguDigitsToNumeric';
import { chevronForward } from 'ionicons/icons';
import { Badge, COLOR } from 'baseui/badge';
import { useHistory } from 'react-router';
import { showPayout } from '../utils/Settings';

const MyTaskCard = ({ task }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const statusBadgeColor = task.status === 'COMPLETED' ? COLOR.positive : COLOR.accent;
  const goToPerformTask = (e, task) => {
    if(task.taskType==='UPLOAD_IMAGE'){
      history.push('/dashboard/tasks/image-upload-task/' + task.taskId);
    }else{
      history.push('/dashboard/tasks/perform-task/' + task.taskId);
    }
    
  };
  return (
    <>
      <IonItem onClick={(e) => goToPerformTask(e, task)} className="clickable-cursor">
        <IonLabel>
          <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <h2>{task.taskName}</h2>
            <Badge
              content={t(`dcag.home.taskHub.status.${task.status}`)}
              color={statusBadgeColor}
            />
          </span>{' '}
          {showPayout &&<p>
            {t(`dcag.tasks.payouts.label`)}: ${task.price}
          </p>}
          {/* <p>
            <small>
              {t(`dcag.tasks.createdAt.label`)}: {formatDate(task.createDateTime)}{' '}
              {t(`dcag.tasks.dueDate.label`)}: {task.dueDateTime ? formatDate(task.dueDateTime) : '-'}
            </small>
          </p> */}
        </IonLabel>
        <IonIcon
          icon={chevronForward}
          className="clickable-cursor"
          color="primary"></IonIcon>
      </IonItem>
    </>
  );
};

export default MyTaskCard;
