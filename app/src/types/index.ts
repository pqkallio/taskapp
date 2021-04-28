export type Task = {
  id: number;
  title: string;
  content: string;
  created: Date;
  done?: Date;
};

export type RawTask = Task & {
  id?: number;
  created?: string;
  done?: string;
};

export type TaskProspect = Pick<Task, 'title' | 'content'>;

export type APIResponse<T> = {
  error?: string;
  data?: T;
};

export type NotifiableAction<T> = {
  type: string;
  payload: T;
  notifySuccess: () => void;
  notifyError: (err: string) => void;
};
