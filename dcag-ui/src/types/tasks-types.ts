export interface Task {
  id: string;
  taskId: string;
  status: string;
  userId: string;
}

export type goToPerformTaskFunctionType = (e: any, task: any) => void;

export type loadMoreFunctionType = (key: any) => Promise<void>;
