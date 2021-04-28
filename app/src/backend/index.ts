import type { APIResponse, RawTask, Task, TaskProspect } from 'src/types';

class BackendAPI {
  private static instance: BackendAPI;
  private apiAddress: string | undefined;

  private constructor() {
    this.apiAddress = import.meta.env.BACKEND_ADDRESS;
  }

  private transformRawTasks(rawTasks: RawTask[]): Task[] {
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
  }

  private transformRawTask(rawTask: RawTask): Task {
    const { id, title, content, created: createdStr, done: doneStr } = rawTask;
    const created = new Date(createdStr!);
    const done = doneStr ? new Date(doneStr) : undefined;
    const task: Task = { id: id!, title, content, created, done };
    return task;
  }

  async fetchTasks(): Promise<Task[]> {
    if (!this.apiAddress) {
      return [];
    }

    try {
      const response = await fetch(`${this.apiAddress}/tasks`);
      const rawTasks = await response.json();
      return this.transformRawTasks(rawTasks);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createTask(task: TaskProspect): Promise<APIResponse<Task>> {
    const body = JSON.stringify(task);
    const request: RequestInit = {
      body,
      method: 'POST',
    };

    try {
      const response = await fetch(`${this.apiAddress}/tasks`, request);
      const rawResponse = await response.json();

      if (rawResponse.error) {
        return { error: rawResponse.error };
      }

      return { data: this.transformRawTask(rawResponse as RawTask) };
    } catch (error: any) {
      console.log(error);
      return { error };
    }
  }

  async taskDone(id: number): Promise<APIResponse<unknown>> {
    const request = {
      method: 'PUT',
    };

    try {
      const response = await fetch(`${this.apiAddress}/${id}/done`);
      const rawResponse = await response.json();

      if (rawResponse.error) {
        return { error: rawResponse.error };
      }

      return {};
    } catch (error: any) {
      console.log(error);
      return { error };
    }
  }

  static getInstance = (): BackendAPI => {
    if (!BackendAPI.instance) {
      BackendAPI.instance = new BackendAPI();
    }

    return BackendAPI.instance;
  };
}

export default BackendAPI.getInstance();
