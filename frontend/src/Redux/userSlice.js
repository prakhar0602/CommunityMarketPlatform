import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "User",
  initialState: {user:undefined},
  reducers: {
    setUser:(state,action)=>{
        state.user = action.payload;
    }
  },
});

export const { setUser } = counterSlice.actions;
export default counterSlice.reducer;