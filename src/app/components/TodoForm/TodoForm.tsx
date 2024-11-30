import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../../../models/Task';

import Button from '../../ui/Button/Button';

// import styles from './TodoForm.module.scss';

export const TodoForm = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleInput = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // IMPORTANT
    const newTask = new Task(Date.now(), value, false);
    dispatch({
      type: 'todos/addTodo',
      payload: {
        id: newTask.id,
        title: newTask.title,
        completed: newTask.completed,
      },
    });
    setValue('');
  };

  return (
    <form onSubmit={handleInput}>
      <input
        type="text"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        required
      />
      <Button color="green" type="submit">
        Добавить
      </Button>
    </form>
  );
};

export default TodoForm;
