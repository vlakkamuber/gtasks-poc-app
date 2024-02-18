
import React, { useEffect } from 'react';
import { useCategory } from '../context/TaskCategoryContext';
import { Select } from "baseui/select";
import {SHAPE,SIZE} from 'baseui/button'
import { useTranslation } from 'react-i18next';
import useAnalytics from '../hooks/useAnanlytics';
import { ANALYTICS_PAGE, LANGUAGE_CODE_MAPPER } from '../constants/constant';
export const TASK_CATEGORIES_DATA = [
  {
    id: 'ALL',
    label: 'All',
  },
  {
    id: 'RECORD_AUDIO',
    label: 'Record Audio',
  },
  {
    id: 'RECEIPT_DIGITIZATION',
    label: 'Receipt Digitization'
  },
  {
    id: 'LOCALIZATION_QUALITY',
    label: 'Localization Quality',
  },
  {
    id: 'IMAGE_LABELLING',
    label: 'Image Labelling',
  },
  {
    id: 'MENU_PHOTO_REVIEW',
    label: 'Menu Photo Review',
  },
];
const taskObj = {
  "ALL":'All',
  "MENU_PHOTO_REVIEW":'Menu Photo Review',
  "IMAGE_LABELLING":"Image Labelling",
  "LOCALIZATION_QUALITY":'Localization Quality',
  "RECEIPT_DIGITIZATION":"Receipt Digitization",
  "RECORD_AUDIO":"Record Audio"
}
const TaskSwitcher: React.FC = () => {
  const { selectedCategory, setSelectedCategory} = useCategory();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.tasks });
  const { t } = useTranslation();
  const [value, setValue] = React.useState({label:taskObj.selectedCategory,id:selectedCategory});
  const handleChange = (params) => {
    const category = params[0].id;
    logEvent({ actions: 'change_task', properties: category });
    localStorage.setItem('selectedCategory', category);
    setSelectedCategory(category);
    setValue({label:taskObj.category,id:category})
  };
  // Set the default language to English if not found in local storage
  const defaultCategory = localStorage.getItem('selectedCategory') || 'ALL';
  useEffect(() => {
    setSelectedCategory(defaultCategory);
    setValue({label:taskObj.defaultCategory,id:defaultCategory})
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Select
      options={TASK_CATEGORIES_DATA}
      size={SIZE.compact}
      shape={SHAPE.pill}
      clearable={false}
      placeholder={<span style={{ color: '#000' }}>{t(`dcag.tasks.changeTask.label`)}</span>} 
      onChange={params => handleChange(params.value)}
      overrides={{
        SelectArrow: {
          style: ({ $theme }) => ({
            borderRadius: '20px',
          }),
        },
        ControlContainer: {
          style: ({ $theme }) => ({
            borderRadius: '20px',
          }),
        },
        DropdownListItem: {
          style: ({ $theme }) => ({
            borderTopLeftRadius: '20px', 
            borderTopRightRadius: '20px', 
            borderBottomLeftRadius: '20px', 
            borderBottomRightRadius: '20px', 
          }),
        },
      }}
    />
  );
};

export default TaskSwitcher;
