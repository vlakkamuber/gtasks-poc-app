export const TEXT_TO_AUDIO = 'textToAudio';
export const AUDIO_TO_AUDIO = 'audioToAudio';

export const LOADER_MESSAGE = {
  message: 'Loading...'
};

export const COUNTRY_OPTIONS = [
  { value: 'in', label: 'India', flag: '🇮🇳', phoneCode: '+91' },
  { value: 'us', label: 'United States', flag: '🇺🇸' },
  { value: 'ca', label: 'Canada', flag: '🇨🇦' }
  // Add more countries as needed
];

export const TEXT_TO_AUDIO_TASK_TYPE = 'TEXT_TO_AUDIO';
export const AUDIO_TO_AUDIO_TASK_TYPE = 'RECORD_AUDIO';
export const IMAGE_TO_TEXT_TASK_TYPE = 'IMAGE_TO_TEXT';
export const UPLOAD_IMAGE_TASK_TYPE = 'UPLOAD_IMAGE';

export const FILTER_OUT_TEXT_TO_AUDIO_TASK = true;

export const COMPLETED_TASK_STATUS = 'COMPLETED';
export const IN_PROGRESS_TASK_STATUS = 'IN_PROGRESS';

export const taskTypeMapperRoute = {
  "RECORD_AUDIO":"/dashboard/tasks/perform-task/",
  "IMAGE_TO_TEXT":"/dashboard/tasks/perform-task/",
  "TEXT_TO_AUDIO":"/dashboard/tasks/perform-task/",
  "RECEIPT_DIGITIZATION":"/dashboard/tasks/questionnaire/",
  "LOCALIZATION_QUALITY":"/dashboard/tasks/questionnaire/",
  "IMAGE_LABELLING":"/dashboard/tasks/questionnaire/",
  "MENU_PHOTO_REVIEW":"/dashboard/tasks/questionnaire/",
  "UPLOAD_IMAGE":"/dashboard/tasks/image-upload-task/"
}

export const taskCategoriesToShow = {
  "RECORD_AUDIO":true, 
  "IMAGE_TO_TEXT":false, 
  "UPLOAD_IMAGE": false,
  "TEXT_TO_AUDIO":false,
  "RECEIPT_DIGITIZATION":true,
  "LOCALIZATION_QUALITY":false,
  "IMAGE_LABELLING":false,
  "MENU_PHOTO_REVIEW":false,
}

export const TasksOrder = [
  'RECORD_AUDIO',
  'IMAGE_TO_TEXT',
  'UPLOAD_IMAGE',
  'TEXT_TO_AUDIO',
  'RECEIPT_DIGITIZATION',
  'LOCALIZATION_QUALITY',
  'IMAGE_LABELLING',
  'MENU_PHOTO_REVIEW'
]

