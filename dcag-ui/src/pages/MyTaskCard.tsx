import { IonBadge, IonItem, IonLabel } from '@ionic/react';
import react from 'React';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/mapTeluguDigitsToNumeric';
import { chevronForward } from 'ionicons/icons';
import { Badge, COLOR } from 'baseui/badge';

const MyTaskCard = ({ task }) => {
  const { t } = useTranslation();
  const statusBadgeColor = task.status === 'COMPLETED' ? COLOR.positive : COLOR.accent;
  return (
    <>
      <IonItem>
        <IonLabel>
          <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <h2>{task.taskName}</h2>
            <Badge
              content={t(`dcag.home.taskHub.status.${task.status}`)}
              color={statusBadgeColor}
            />
            {/* <IonBadge color="primary" className={`status-text-completed`}>
              {t(`dcag.home.taskHub.status.${task.status}`)}
            </IonBadge> */}
          </span>{' '}
          <p>
            {t(`dcag.tasks.payouts.label`)}: ${task.price}
          </p>
          <p>
            <small>
              {t(`dcag.tasks.createdAt.label`)}: {formatDate(task.createDateTime)}{' '}
              {t(`dcag.tasks.dueDate.label`)}: {formatDate(task.dueDateTime)}
            </small>
          </p>
        </IonLabel>
        <ion-icon icon={chevronForward} onClick={(e) => goToPerformTask(e, task)}></ion-icon>
      </IonItem>
      {/* Add more IonItem elements as needed */}
    </>
  );
};

export default MyTaskCard;
