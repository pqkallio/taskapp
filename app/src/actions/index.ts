import type { Task } from 'src/types';

export type tasksType = {
  type: string;
  payload: Task[];
};

export const setTasks = (tasks: Task[]): tasksType => ({
  type: 'tasks/set',
  payload: tasks,
});
