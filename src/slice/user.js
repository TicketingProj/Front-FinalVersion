import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  fullName: "",
  email: "",
  phoneNumber: phoneNumber,
};

export const userHandler = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPhoneNumber: (state, action) => {
      state.id = action.payload.id;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});
