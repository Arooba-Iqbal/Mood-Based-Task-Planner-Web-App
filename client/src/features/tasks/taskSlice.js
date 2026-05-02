import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { fetchDashboard } from "../mood/moodSlice";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await api.get("/tasks");
  return response.data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (payload, { dispatch }) => {
    const res = await api.post("/tasks", payload); // ✔ use SAME api

    dispatch(fetchDashboard());

    return res.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, { dispatch }) => {
    const res = await api.put(`/tasks/${id}`, data);

    dispatch(fetchDashboard());

    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { dispatch }) => {
    await api.delete(`/tasks/${id}`);

    dispatch(fetchDashboard());

    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      });
  }
});

export default taskSlice.reducer;
