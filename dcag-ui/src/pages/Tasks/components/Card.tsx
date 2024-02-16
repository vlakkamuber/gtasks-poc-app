import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeadingSmall, LabelSmall, LabelXSmall } from 'baseui/typography';

interface CardProps {
  icon: string;
  label: string;
  count: string | number;
  bgColor: string;
  TitleIcon: React.FC;
  className: string;
  todayCount: string | number;
}

const Card: React.FC<CardProps> = ({ TitleIcon, bgColor, label, className, count, todayCount }) => {
  const { t } = useTranslation();

  return (
    <div
      className={className}
      style={{ backgroundColor: bgColor, padding: '12px 16px', borderRadius: 8 }}>
      <div style={{ color: '#4B4B4B' }}>
        <LabelXSmall color="#4B4B4B" style={{ display: 'flex', alignItems: 'center' }}>
          <TitleIcon />{label}
        </LabelXSmall>
      </div>
      <HeadingSmall>{count}</HeadingSmall>
      <LabelSmall
        style={{
          color: '#000000'
        }}>
        ({t('dcag.tasks.text.today')} - {todayCount})
      </LabelSmall>
    </div>
  );
};

export default Card;
