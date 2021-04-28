import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { initialState } from 'src/store/initialState';
import type { Task } from 'src/types';
import TaskCreator from './TaskCreator';

const Tasks: React.FC = () => {
  const { tasks } = useSelector((state: typeof initialState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'tasks/fetch' });
  }, []);

  return (
    <>
      <h2>Tasks</h2>
      <TaskCreator />
      {tasks.map((task: Task) => (
        <div key={task.created.toISOString()}>
          {task.created.toDateString()} {task.title}: {task.content},{' '}
          {task.done ? 'done' : 'not done'}
        </div>
      ))}
    </>
  );
};

export default Tasks;
