import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_HOST, configHeader } from "./../utils/https";
import Alerts from "../utils/Alert";

const initialState = {
  isLoggedIn: false,
  token: null,
  id: null,
  profile: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.User_Id;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.id = null;
      state.profile = null;
    },
    profile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const loginAction = (data, setLoader) => async (dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      url: API_HOST + `/user/login/`,
      data: data,
      headers: configHeader,
    });
    // console.log("In login action", res.data);
    dispatch(login(res.data));
    setLoader(false);
  } catch (error) {
    let params = {
      title: "An error occurred.",
      description: error.response.data.error || "Invalid Email or Password.",
      status: "error",
      duration: 5000,
      isClosable: true,
    };
    Alerts(params);
    setLoader(false);
    // console.log("login error", error.response.data);
  }
};

export const forgotPasswordAction = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      url: API_HOST + `/user/login/`,
      data: data,
      headers: configHeader,
    });
    console.log("In forgotPasswordAction action", res.data);
  } catch (error) {
    console.log("forgotPasswordAction error", error.response);
  }
};

export const logoutAction = (token) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  try {
    const res = await axios({
      method: "GET",
      url: API_HOST + `/user/logout/`,
      headers: localHeader,
    });
    console.log("In logoutAction action", res.data);
    dispatch(logout());
  } catch (error) {
    console.log("logoutAction error", error.response);
  }
};

export const getCurrentUserAction = (token) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  try {
    const res = await axios({
      method: "GET",
      url: API_HOST + `/user/getcurrentuser/`,
      headers: localHeader,
    });
    // console.log("In getCurrentUserAction action", res.data);
    dispatch(profile(res.data.response[0]));
  } catch (error) {
    // console.log("getCurrentUserAction error", error.response);
  }
};

export const { login, logout, profile } = authSlice.actions;
export default authSlice.reducer;
