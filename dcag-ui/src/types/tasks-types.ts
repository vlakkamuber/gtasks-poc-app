export interface Task {
  id: string;
  taskId: string;
  status: string;
  userId: string;
}

export type goToPerformTaskFunctionType = (e: any, task: any) => void;

export type loadMoreFunctionType = (key: any) => Promise<void>;

export type TaskCategoryType = {
  id: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  show: boolean;
  rate: number;
  duration: string;
  timeUnit: string;
};

export type TaskTypesType =
  | 'RECORD_AUDIO'
  | 'IMAGE_TO_TEXT'
  | 'UPLOAD_IMAGE'
  | 'TEXT_TO_AUDIO'
  | 'RECEIPT_DIGITIZATION'
  | 'LOCALIZATION_QUALITY'
  | 'IMAGE_LABELLING'
  | 'MENU_PHOTO_REVIEW';
