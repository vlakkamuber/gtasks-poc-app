import React, { useEffect } from 'react';
import { useCategory } from '../../context/TaskCategoryContext';
import { useTranslation } from 'react-i18next';
import useAnalytics from '../../hooks/useAnanlytics';
import { ANALYTICS_PAGE } from '../../constants/constant';
import { IonSelect, IonSelectOption } from '@ionic/react';

export const TASK_CATEGORIES_DATA = [
  {
    id: 'RECORD_AUDIO',
    label: 'Record Audio'
  },
  {
    id: 'RECEIPT_DIGITIZATION',
    label: 'Receipt Digitization'
  },
  {
    id: 'LOCALIZATION_QUALITY',
    label: 'Localization Quality'
  },
  {
    id: 'IMAGE_LABELLING',
    label: 'Image Labelling'
  },
  {
    id: 'MENU_PHOTO_REVIEW',
    label: 'Menu Photo Review'
  }
];
const taskObj = {
  MENU_PHOTO_REVIEW: 'Menu Photo Review',
  IMAGE_LABELLING: 'Image Labelling',
  LOCALIZATION_QUALITY: 'Localization Quality',
  RECEIPT_DIGITIZATION: 'Receipt Digitization',
  RECORD_AUDIO: 'Record Audio'
};
const TaskSwitcher: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.tasks });
  const { t } = useTranslation();
  const [value, setValue] = React.useState({
    label: taskObj.selectedCategory,
    id: selectedCategory
  });
  const handleChange = (params) => {
    const category = params.detail.value;
    if (!category) {
      return;
    }
    logEvent({ actions: 'change_task', properties: category });
    localStorage.setItem('selectedCategory', category);
    setSelectedCategory(category);
    setValue({ label: taskObj.category, id: category });
  };

  // Set the default language to English if not found in local storage
  const defaultCategory = localStorage.getItem('selectedCategory') || 'ALL';

  useEffect(() => {
    setSelectedCategory(defaultCategory);
    setValue({ label: taskObj.defaultCategory, id: defaultCategory });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const customAlertOptions = {
    header: t('dcag.tasks.changeTask.label')
  };

  return (
    <IonSelect
      style={{
        background: 'rgb(246, 246, 246)',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 25
      }}
      compareWith={() => false}
      placeholder={t(`dcag.tasks.changeTask.label`)}
      interfaceOptions={customAlertOptions}
      onIonChange={handleChange}>
      {TASK_CATEGORIES_DATA.map((option) => ({
        ...option,
        label: t(`dcag.home.taskHub.${option.id}.title`)
      })).map((option) => {
        return (
          <IonSelectOption key={option.id} value={option.id}>
            {option.label}
          </IonSelectOption>
        );
      })}
    </IonSelect>
  );
};

export default TaskSwitcher;
