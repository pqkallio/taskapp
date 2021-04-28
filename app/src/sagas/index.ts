import { all, call, put, takeLatest } from 'redux-saga/effects';
import type {
  APIResponse,
  NotifiableAction,
  Task,
  TaskProspect,
} from 'src/types';
import Backend from '../backend';

function* createTask(action: NotifiableAction<TaskProspect>) {
  const { payload: taskProspect, notifySuccess, notifyError } = action;

  const taskResponse: APIResponse<Task> = yield call(
    Backend.createTask.bind(Backend),
    taskProspect,
  );

  if (taskResponse.error) {
    yield call(notifyError, taskResponse.error);
    return;
  }

  if (!taskResponse.data) {
    yield call(notifyError, 'the response has no data');
    return;
  }

  yield put({ type: 'tasks/add', payload: taskResponse.data });
  yield call(notifySuccess);
}

function* fetchTasks() {
  const tasks: Task[] = yield call(Backend.fetchTasks.bind(Backend));
  yield put({ type: 'tasks/put', payload: tasks });
}

function* taskDone(action: NotifiableAction<number>) {
  const { payload: id, notifySuccess, notifyError } = action;

  const response: APIResponse<unknown> = yield call(
    Backend.taskDone.bind(Backend),
    id,
  );

  if (response.error) {
    yield call(notifyError, response.error);
    return;
  }

  yield put({ type: 'tasks/done', payload: id });
  yield call(notifySuccess);
}

export default function* rootSaga() {
  yield all([
    takeLatest('tasks/fetch', fetchTasks),
    takeLatest('tasks/create', createTask),
    takeLatest('tasks/do', taskDone),
  ]);
}
