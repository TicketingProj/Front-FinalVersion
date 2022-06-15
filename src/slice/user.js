import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatar: "",
  id: "",
  isSavior: false,
  fullName: "",
  email: "",
  token: "",
  phoneNumber: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
    addOtp: (state, action) => {
      const { id, isSavior, token } = action.payload;
      state.id = id;
      state.isSavior = isSavior;
      state.token = token;
    },
    addAllData: (state, action) => {
      const { avatar, id, isSavior, fullName, email, token, phoneNumber } =
        action.payload;
      state.avatar = avatar;
      state.fullName = fullName;
      state.email = email;
      state.phoneNumber = phoneNumber;
      state.id = id;
      state.isSavior = isSavior;
      state.token = token;
    },
  },
});

export const { addAllData, addPhoneNumber, addOtp } = userSlice.actions;

export default userSlice.reducer;
