export class Task {
  constructor(
    public userId: number,
    public id: number,
    public title: string,
    public completed: boolean
  ) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
  completedToggler() {
    this.completed = !this.completed;
  }
}

export interface ITask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
