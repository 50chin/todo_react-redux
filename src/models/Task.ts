export class Task {
  constructor(
    public id: number,
    public title: string,
    public completed: boolean
  ) {}

  isCompleted() {
    this.completed = !this.completed;
  }
}
