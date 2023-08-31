import type { RawTask, Task } from "src/types";

export const transformRawTasks = (rawTasks: RawTask[]): Task[] => {
  return rawTasks.map((rawTask: RawTask) => {
    const {
      id,
      title,
      content,
      created: createdStr,
      done: doneStr,
    } = rawTask;
    const created = new Date(createdStr!);
    const done = doneStr ? new Date(doneStr) : undefined;
    const task: Task = { id: id!, title, content, created, done };
    return task;
  });
};

export const transformRawTask = (rawTask: RawTask): Task => {
	const { id, title, content, created: createdStr, done: doneStr } = rawTask;
	const created = new Date(createdStr!);
	const done = doneStr ? new Date(doneStr) : undefined;
	const task: Task = { id: id!, title, content, created, done };
	return task;
};
