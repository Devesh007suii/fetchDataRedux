import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  return response.json();
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default todoSlice.reducer;
