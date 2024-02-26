import React from 'react';
import { ParagraphSmall } from 'baseui/typography';
import { useTranslation } from 'react-i18next';

const NoTasksAvailable: React.FC<{ completedCount: number; selectedCategoryTitle?: string }> = ({
  completedCount,
  selectedCategoryTitle
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <ParagraphSmall>
        {completedCount
          ? t('dcag.tasks.text.all_task_completed')
          : t('dcag.tasks.text.no_more_task')}{' '}
        {selectedCategoryTitle} {t('dcag.tasks.text.continue_other_task')}
      </ParagraphSmall>
    </div>
  );
};

export default NoTasksAvailable;
