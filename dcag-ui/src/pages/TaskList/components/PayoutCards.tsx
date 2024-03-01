import React from 'react';
import PersonMultipleFilled from '@uber/icons/person-multiple-filled';
import MoneyFilled from '@uber/icons/money-filled';
import { to2DecimalPlaces } from '../../../utils';
import { people, business } from 'ionicons/icons';
import Card from '../Card';
import { useTranslation } from 'react-i18next';

const PayoutCards: React.FC = ({ todayCount, completedCount, todayEarnings, totalEarned }) => {
  const { t } = useTranslation();
  return (
    <div className="tasks-info" style={{ marginTop: '8px' }}>
      <Card
        className="task-detail"
        icon={people}
        TitleIcon={() => (
          <PersonMultipleFilled size={16} color="#276EF1" style={{ marginRight: 8 }} />
        )}
        bgColor="#EFF4FE"
        label={t(`dcag.tasks.page.completedTask.label`)}
        count={completedCount}
        todayCount={todayCount}
      />
      <Card
        className="task-count"
        icon={business}
        TitleIcon={() => <MoneyFilled size={16} color="#0E8345" style={{ marginRight: 8 }} />}
        bgColor="#EAF6ED"
        label={t(`dcag.tasks.page.youEarned.label`)}
        count={`₹${to2DecimalPlaces(totalEarned)}`}
        todayCount={`₹${to2DecimalPlaces(todayEarnings)}`}
      />
    </div>
  );
};

export default PayoutCards;
