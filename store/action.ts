import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";

import { IUser } from "@/types/IUser";

import { fetchUserData, updateUserData } from "@/apis/userApi";

export const onUpdateUserData = createAsyncThunk(
  "user/onUpdateUserData",
  async ({ id, payload }: { id: string; payload: Partial<IUser> }) => {
    const user = await updateUserData(id, payload);

    return user;
  }
);

export const onFetchUserData = createAsyncThunk(
  "user/onFetchUserData",
  async () => {
    const users = await fetchUserData();

    return users;
  }
);

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCredential.user.getIdToken();

    localStorage.setItem("token", token);

    return token;
  }
);

export const setToken = createAction<string>("setToken");
