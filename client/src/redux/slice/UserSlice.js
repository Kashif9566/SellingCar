import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    setUser: (state, action) => {
      return { ...action.payload, isLoggedIn: true };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => ({ isLoggedIn: false }),
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
