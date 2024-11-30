import { Task } from '../models/Task';

export interface TodoStateProps {
  todos: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: unknown | null;
}
