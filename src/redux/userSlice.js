import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userModel: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserModel: (state, action) => {
      state.userModel = action.payload;
    },
  },
});

export const { setToken, setUserModel } = userSlice.actions;
export default userSlice.reducer;
