import React from 'react';
import { Card, StyledBody, StyledThumbnail } from 'baseui/card';
import { useTranslation } from 'react-i18next';
import TagFilled from '@uber/icons/tag-filled';
import ClockFilled from '@uber/icons/clock-filled';
import { Button, SHAPE } from 'baseui/button';

const TaskCard: React.FC = ({ category, handleTaskCategory }) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => handleTaskCategory(category.id)}
      className="clickable-cursor task-category-wrapper">
      <Card
        overrides={{ Root: { style: { marginBottom: '32px' } } }}
        title={t(`dcag.home.taskHub.${category.id}.title`)}>
        <div style={{ display: 'flex', alignItems: "center" }}>
          <StyledBody style={{ color: '#6b6b6b' }}>
            {t(`dcag.home.taskHub.${category.id}.subtitle`)}
          </StyledBody>
          <StyledThumbnail style={{ borderRadius: 10 }} src={category.imageSrc} />
        </div>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TagFilled color={'#0E8345'} style={{ marginRight: 4 }} /> ₹
            {(Math.round(category.rate * 100) / 100).toFixed(2)}/{t('dcag.home.text.task')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
            <ClockFilled style={{ marginRight: 4 }} /> {category.duration} {t(category.timeUnit)}/
            {t('dcag.home.text.task')}
          </div>
        </div>
        <Button shape={SHAPE.pill}>Select</Button>
      </Card>
    </div>
  );
};

export default TaskCard;
