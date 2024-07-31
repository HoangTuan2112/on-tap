import { createSlice } from "@reduxjs/toolkit";

const todoReducer = createSlice({
  name: "todo",
  initialState: {
    todos: JSON.parse(localStorage.getItem("todos")) || [
      { id: 1, title: "First todo", completed: false },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id:
          state.todos.length === 0
            ? 1
            : state.todos.reduce((a, b) => (a.id > b.id ? a : b)).id + 1,
        title: action.payload,
        completed: false,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index] = action.payload;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleComplete: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos[index].completed = !state.todos[index].completed;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    filterTodo: (state, action) => {
      if (action.payload === "all") {
        console.log(state.todos);
        return state.todos;
      } else if (action.payload === "completed") {
        return state.todos.filter((todo) => todo.completed);
      } else {
        return state.todos.filter((todo) => !todo.completed);
      }
    },
    toggleCompleteAll: (state) => {
      state.todos = state.todos.map((todo) => {
        return { ...todo, completed: !todo.completed };
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodoAll: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
   
  },
});
export const {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleComplete,
  filterTodo,
  toggleCompleteAll,
  deleteTodoAll,
  fiterByTittle
} = todoReducer.actions;
export default todoReducer.reducer;
