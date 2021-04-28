import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { NotifiableAction, TaskProspect } from 'src/types';

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
    const action: NotifiableAction<TaskProspect> = {
      type: 'tasks/create',
      payload: task,
      notifySuccess: onSuccess,
      notifyError: onError,
    };
    dispatch(action);
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
