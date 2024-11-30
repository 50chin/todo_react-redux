import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TodoStateProps } from '../../types/TodoState';

import axios from 'axios';

const initialState: TodoStateProps = {
  todos: [],
  status: 'idle',
  error: null,
};

export const getTodoList = createAsyncThunk('todos/getTodoList', async () => {
  try {
    const res = await axios.get('http://localhost:3000/todos');
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.todos.findIndex((el) => el.id === id); // находим индекс элемента по id

      if (index !== -1) {
        // проверяем, найден ли элемент
        state.todos[index] = {
          ...state.todos[index], // сохраняем старые данные элемента
          ...updatedData, // добавляем обновленные данные
        };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(getTodoList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
