import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import type { initialState } from 'src/store/initialState';
import type { RawTask, Task } from 'src/types';
import { transformRawTask } from '../util/tasks';
import TaskCreator from './TaskCreator';

const socketUrl = 'ws://localhost:6868/tasks/initSocket';

const Tasks: React.FC = () => {
  const { tasks } = useSelector((state: typeof initialState) => state);
  const dispatch = useDispatch();

  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      dispatch({ type: 'tasks/add', payload: transformRawTask(JSON.parse(lastMessage.data) as RawTask) });
      console.log(lastMessage);
    }
  }, [lastMessage]);

  useEffect(() => {
    dispatch({ type: 'tasks/fetch' });
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const taskDone = (id: number) => () => {};

  return (
    <>
    <p>WebSocket status: {connectionStatus}</p>
      <h2>Tasks</h2>

      <TaskCreator />

      <h3>Open</h3>

      {tasks
        .filter((task: Task) => !task.done)
        .map((task: Task) => (
          <div key={task.created.toISOString()}>
            {task.created.toDateString()} {task.title}: {task.content},{' '}
            {task.done ? 'done' : 'not done'}
            <button onClick={taskDone(task.id)}>Done</button>
          </div>
        ))}

      <h3>Done</h3>

      {tasks
        .filter((task: Task) => task.done)
        .map((task: Task) => (
          <div key={task.created.toISOString()}>
            {task.created.toDateString()} {task.title}: {task.content},{' '}
            {task.done ? 'done' : 'not done'}
          </div>
        ))}
    </>
  );
};

export default Tasks;
