import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice"; // Import your reducer

const store = configureStore({
  reducer: {
    User:user,
  },
});

export default store;
