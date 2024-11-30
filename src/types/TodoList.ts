import { Task } from '../models/Task';

export interface TodoListProps {
  todo: Task;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, title: string) => void;
}
