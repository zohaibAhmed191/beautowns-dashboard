import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    currentPath: "asd123",
    storeInfo: null,
    user: null,
    email_for_verification: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    set_store_info: (state, action) => {
      state.storeInfo = action.payload;
    },
    set_Email_For_Verification: (state, action) => {
      state.email_for_verification = action.payload;
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.storeInfo = null;
    },
  },
  //   extraReducers: {
  //     [reduxApis.userLogin.pending]: (state) => {
  //       state.loading = true;
  //     },
  //     [reduxApis.userLogin.fulfilled]: (state, action) => {
  //       const message = action.payload.data.message;

  //       state.loading = false;
  //       state.user = action.payload.data.user;
  //     },
  //     [reduxApis.userLogin.rejected]: (state, action) => {
  //       //   toast.error(action.error.message);
  //       state.loading = false;
  //       state.error = action.error.message;
  //     },
  //   },
});

export const {
  logout,
  setUser,
  setUserType,
  set_store_info,
  set_Email_For_Verification,
  setCurrentPath,
} = userSlice.actions;

export default userSlice.reducer;
