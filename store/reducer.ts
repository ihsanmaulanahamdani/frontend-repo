import { createSlice } from "@reduxjs/toolkit";
import { logIn, onFetchUserData, onUpdateUserData, setToken } from "./action";
import { IUser } from "@/types/IUser";

export const initialState = () => ({
  user: {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  },
  users: [] as IUser[],
  loading: false,
  errorMessage: "",
  isLogin: false,
  token: "",
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch User Data
    builder.addCase(onFetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(onFetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.errorMessage = "";
      state.users = action.payload as IUser[];
    });
    builder.addCase(onFetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message as string;
    });
    // Update User Data
    builder.addCase(onUpdateUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(onUpdateUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.errorMessage = "";
      state.user = action.payload as IUser;
    });
    builder.addCase(onUpdateUserData.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message as string;
    });
    // Log In
    builder.addCase(logIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      state.errorMessage = "";
      state.token = action.payload as string;
      state.isLogin = true;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.message as string;
    });
    builder.addCase(
      setToken,
      (state: ReturnType<typeof initialState>, action) => {
        state.token = action.payload;
        state.isLogin = true;
      }
    );
  },
});

export default userSlice.reducer;
