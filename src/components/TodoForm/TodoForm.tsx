import { useState } from "react";
import { useDispatch } from "react-redux";
// import { Task } from "../../models/Task";

import Button from "../../ui/Button/Button";
import { addTodoList } from "../../Redux/slice/todoSlice";

// import styles from './TodoForm.module.scss';

export const TodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleInput = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addTodoList({ title: value, completed: false }));
    setValue("");
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
