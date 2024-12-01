import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoStateProps } from "../../types/TodoState";
import { ITask, Task } from "../../models/Task";

import axios from "axios";

const initialState: TodoStateProps = {
  todos: [],
  status: "idle",
  error: null,
};

const BASE_URL = "http://localhost:3000/todos";
export const getTodoList = createAsyncThunk("todos/getTodoList", async () => {
  try {
    const res = await axios.get(BASE_URL);
    const dataArr = res.data;
    const tasksArr = dataArr.map((el: ITask) => ({
      userId: el.userId,
      id: el.id,
      title: el.title,
      completed: el.completed,
    }));
    return tasksArr;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const addTodoList = createAsyncThunk(
  "todos/addTodoList",
  async (newTodo: Task) => {
    try {
      const res = await axios.post(BASE_URL, newTodo);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const editTodoList = createAsyncThunk(
  "todos/editTodoList",
  async ({
    id,
    updatedData,
  }: {
    id: number;
    updatedData: { title: string };
  }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const deleteTodoList = createAsyncThunk(
  "todos/deleteTodoList",
  async (id: number) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(getTodoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state.todos.push(action.payload); // добавляем новую задачу
      })
      .addCase(editTodoList.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (el) => el.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload; // обновляем задачу
        }
      })
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        const idToDelete = action.meta.arg; // Получаем id задачи из аргументов
        state.todos = state.todos.filter((el) => el.id !== idToDelete); // удаляем задачу
      });
  },
});

export const {} = todoSlice.actions;
export default todoSlice.reducer;
