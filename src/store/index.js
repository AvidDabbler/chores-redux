import { configureStore } from "@reduxjs/toolkit";
import { humanSlice } from "./humansSlice";
import { taskSlice } from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    humans: humanSlice.reducer
  }
});

