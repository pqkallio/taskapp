import { all, call, put, takeLatest } from 'redux-saga/effects';
import type { ErrorResponse, RawTask, Task, TaskProspect } from 'src/types';
import Backend from '../backend';

function* createTask(action: {
  type: string;
  task: TaskProspect;
  notifySuccess: () => void;
}) {
  const { task: taskProspect, notifySuccess } = action;
  const task: Task | ErrorResponse = yield call(
    Backend.createTask.bind(Backend),
    taskProspect,
  );
}

function* fetchTasks() {
  const tasks: Task[] = yield call(Backend.fetchTasks.bind(Backend));
  console.log(tasks);
  yield put({ type: 'tasks/put', payload: tasks });
}

export default function* rootSaga() {
  yield all([
    takeLatest('tasks/fetch', fetchTasks),
    takeLatest('tasks/create', createTask),
  ]);
}
