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
  RECORD_AUDIO: '/dashboard/tasks/perform-task/',
  IMAGE_TO_TEXT: '/dashboard/tasks/perform-task/',
  TEXT_TO_AUDIO: '/dashboard/tasks/perform-task/',
  RECEIPT_DIGITIZATION: '/dashboard/tasks/questionnaire/',
  LOCALIZATION_QUALITY: '/dashboard/tasks/questionnaire/',
  IMAGE_LABELLING: '/dashboard/tasks/questionnaire/',
  MENU_PHOTO_REVIEW: '/dashboard/tasks/questionnaire/',
  UPLOAD_IMAGE: '/dashboard/tasks/image-upload-task/'
};

export const taskCategoriesToShow = {
  RECORD_AUDIO: true,
  IMAGE_TO_TEXT: false,
  UPLOAD_IMAGE: false,
  TEXT_TO_AUDIO: false,
  RECEIPT_DIGITIZATION: true,
  LOCALIZATION_QUALITY: true,
  IMAGE_LABELLING: true,
  MENU_PHOTO_REVIEW: true
};

export const TasksOrder = [
  'RECORD_AUDIO',
  'IMAGE_TO_TEXT',
  'UPLOAD_IMAGE',
  'TEXT_TO_AUDIO',
  'RECEIPT_DIGITIZATION',
  'LOCALIZATION_QUALITY',
  'IMAGE_LABELLING',
  'MENU_PHOTO_REVIEW'
];
export const TaskOrderByLocation = {
  DELHI: [
    'IMAGE_LABELLING',
    'MENU_PHOTO_REVIEW',
    'LOCALIZATION_QUALITY',
    'RECEIPT_DIGITIZATION',
    'RECORD_AUDIO'
  ],
  PUNE: [
    'IMAGE_LABELLING',
    'MENU_PHOTO_REVIEW',
    'LOCALIZATION_QUALITY',
    'RECEIPT_DIGITIZATION',
    'RECORD_AUDIO'
  ],
  OTHER: [
    'RECORD_AUDIO',
    'IMAGE_TO_TEXT',
    'UPLOAD_IMAGE',
    'TEXT_TO_AUDIO',
    'RECEIPT_DIGITIZATION',
    'LOCALIZATION_QUALITY',
    'IMAGE_LABELLING',
    'MENU_PHOTO_REVIEW'
  ]
};

export const TASK_RATE = {
  RECORD_AUDIO: 0.8,
  DESCRIBE_IMAGE: 2,
  UPLOAD_IMAGE: 2,
  RECEIPT_DIGITIZATION: 1.3,
  LOCALIZATION_QUALITY: 1.7,
  IMAGE_LABELLING: 0.6,
  MENU_PHOTO_REVIEW: 0.6
};

export const ANALYTICS_PAGE = {
  tasks: 'tasks_page',
  login: 'login_page',
  home: 'home_page',
  training: 'training_page',
  account: 'account_page',
  report_bug: 'report_bug_page',
  navigation_bar: 'navigation_bar'
};

export const TASK_TYPE_TO_TRAINING_VIDEO_MAPPER: Record<string, string> = {
  RECEIPT_DIGITIZATION: 'receipt_digitization',
  IMAGE_LABELLING: 'image_labelling',
  LOCALIZATION_QUALITY: 'localization_quality',
  MENU_PHOTO_REVIEW: 'menu_photo_review',
  RECORD_AUDIO: 'record_audio'
};

export const LANGUAGE_CODE_MAPPER: Record<string, string> = {
  en: 'english',
  ts: 'telugu',
  hn: 'hindi',
  ta: 'tamil',
};

export const TASK_CATEGORIES_DATA = [
  {
    id: 'RECORD_AUDIO',
    imageSrc: 'assets/record_audio.png',
    title: 'Record Audio',
    subtitle: 'Read text, validate pronunciation and record correct audio',
    show: true,
    rate: TASK_RATE['RECORD_AUDIO'],
    duration: '30',
    timeUnit: 'dcag.home.card.duration.seconds'
  },
  {
    id: 'DESCRIBE_IMAGE',
    imageSrc: 'assets/audio_to_audio.png',
    title: 'Describe Image',
    subtitle: 'View the location image and provide description about the image.',
    show: false,
    rate: TASK_RATE['DESCRIBE_IMAGE'],
    duration: '15',
    timeUnit: 'dcag.home.card.duration.minutes'
  },
  {
    id: 'UPLOAD_IMAGE',
    imageSrc: 'assets/text_to_audio.png',
    title: 'Upload Image',
    subtitle: 'upload a location image and provide description about the image.',
    show: false,
    rate: TASK_RATE['UPLOAD_IMAGE'],
    duration: '15',
    timeUnit: 'dcag.home.card.duration.minutes'
  },
  {
    id: 'RECEIPT_DIGITIZATION',
    imageSrc: 'assets/receipt_digitization.png',
    title: 'Receipt Digitization',
    subtitle: 'View the receipt image and provide answer about the image.',
    show: true,
    rate: TASK_RATE['RECEIPT_DIGITIZATION'],
    duration: '45',
    timeUnit: 'dcag.home.card.duration.seconds'
  },
  {
    id: 'LOCALIZATION_QUALITY',
    imageSrc: 'assets/language_quality.png',
    title: 'Localization Quality',
    subtitle: 'View the receipt image and provide answer about the image.',
    show: true,
    rate: TASK_RATE['LOCALIZATION_QUALITY'],
    duration: '1',
    timeUnit: 'dcag.home.card.duration.minutes'
  },
  {
    id: 'IMAGE_LABELLING',
    imageSrc: 'assets/Image_labelling.png',
    title: 'Image Labelling',
    subtitle: 'View the image  and provide answer about the image.',
    show: true,
    rate: TASK_RATE['IMAGE_LABELLING'],
    duration: '20',
    timeUnit: 'dcag.home.card.duration.seconds'
  },
  {
    id: 'MENU_PHOTO_REVIEW',
    imageSrc: 'assets/men_review.png',
    title: 'Menu Photo Review',
    subtitle: 'View the image  and provide answer about the image.',
    show: true,
    rate: TASK_RATE['MENU_PHOTO_REVIEW'],
    duration: '20',
    timeUnit: 'dcag.home.card.duration.seconds'
  }
];
