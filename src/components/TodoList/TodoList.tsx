import styles from "./TodoList.module.scss";
import { TodoListProps } from "../../types/TodoList";
import Button from "../../ui/Button/Button";
import { useState } from "react";

export const TodoList: React.FC<TodoListProps> = ({
  todo,
  handleDelete,
  handleEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const toggleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const saveEdit = () => {
    handleEdit(todo.id, newTitle);
    setIsEdit((prevState) => !prevState);
  };

  return (
    <li className={styles.list__item}>
      {isEdit ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button color="green" onClick={saveEdit}>
            Сохранить
          </Button>
          <Button color="red" onClick={toggleEdit}>
            Отмена
          </Button>
        </>
      ) : (
        <>
          <p className={styles.list__title}>{todo.title}</p>
          <Button color="green" onClick={toggleEdit}>
            Редактировать
          </Button>
          <Button color="red" onClick={() => handleDelete(todo.id)}>
            Удалить
          </Button>
        </>
      )}
    </li>
  );
};
