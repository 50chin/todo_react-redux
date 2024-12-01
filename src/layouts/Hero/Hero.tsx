import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";

import styles from "./Hero.module.scss";
// prettier-ignore
import {deleteTodoList,getTodoList,editTodoList} from '../../Redux/slice/todoSlice';
import { TodoList } from "../../components/TodoList/TodoList";
import TodoForm from "../../components/TodoForm/TodoForm";

export const Hero = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(getTodoList());
    console.log("useEffect");
  }, [dispatch]);

  const handleEdit = (id: number, newTitle: string) => {
    const updatedData = { title: newTitle };
    dispatch(editTodoList({ id, updatedData }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodoList(id));
  };

  return (
    <>
      <h1 className={styles.hero__title}>TODO LIST</h1>
      <TodoForm />
      <ul className={styles.hero__list}>
        {todos.map((el) => (
          <TodoList
            key={el.id}
            todo={el}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </>
  );
};

export default Hero;
