import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { TaskProspect } from 'src/types';

const TaskCreator: React.FC = () => {
  const newTask = { title: '', content: '' };

  const [task, setTask] = React.useState<TaskProspect>({ ...newTask });

  const dispatch = useDispatch();

  const updateTask = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;

    setTask({ ...task, [id]: value });
  };

  const onSuccess = () => {
    setTask({ ...newTask });
  };

  const onError = (err: string) => {
    console.log(err);
  };

  const addTask = () => {
    dispatch({
      type: 'tasks/create',
      notifySuccess: onSuccess,
      notifyError: onError,
    });
  };

  return (
    <div>
      <input
        type="string"
        id="title"
        onChange={updateTask}
        value={task.title}
      />
      <input
        type="string"
        id="content"
        onChange={updateTask}
        value={task.content}
      />
      <button disabled={!task.title.length} onClick={addTask}>
        Add
      </button>
    </div>
  );
};

export default TaskCreator;
