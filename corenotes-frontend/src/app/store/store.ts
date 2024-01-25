import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./features/todosSlice";
import generalStateSlice from "./features/generalStateSlice";

export const store = configureStore({
  reducer: {
    todosState: todosSlice,
    generalState: generalStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
