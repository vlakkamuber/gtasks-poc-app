
import React, { useEffect } from 'react';
import { useCategory } from '../context/TaskCategoryContext';
import { Select } from "baseui/select";
import {SHAPE,SIZE} from 'baseui/button'
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
  const [value, setValue] = React.useState({label:"Change Task",id:selectedCategory});
  const handleChange = (params) => {
    const category = params[0].id;
    localStorage.setItem('selectedCategory', category);
    setSelectedCategory(category);
    setValue({label:"Switch Task",id:category})
  };
  // Set the default language to English if not found in local storage
  const defaultCategory = localStorage.getItem('selectedCategory') || 'ALL';
  useEffect(() => {
    setSelectedCategory(defaultCategory);
    setValue({label:"Change Task",id:defaultCategory})
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Select
      options={TASK_CATEGORIES_DATA}
      size={SIZE.compact}
      shape={SHAPE.pill}
      clearable={false}
      placeholder={<span style={{ color: '#000' }}>Change Task</span>}
      onClose={() => setValue({ label: "Switch Task", id: selectedCategory })} 
      onChange={params => handleChange(params.value)}
    />
  );
};

export default TaskSwitcher;
