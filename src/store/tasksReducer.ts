import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { tasks: { text: string; completed: boolean }[] } = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({ text: action.payload, completed: false });
    },
    editTask: (
      state,
      action: PayloadAction<{ index: number; text: string }>
    ) => {
      state.tasks.splice(action.payload.index, 1, {
        ...state.tasks[action.payload.index],
      });
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
    },
    completeTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1, {
        ...state.tasks[action.payload],
        completed: true,
      });
    },
  },
});

export const { addTask, completeTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
