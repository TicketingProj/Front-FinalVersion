import { configureStore } from "@reduxjs/toolkit";

//slice
import userSlice from "../slice/user";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
