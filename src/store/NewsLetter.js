import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Alerts from "../utils/Alert";

import { API_HOST, configHeader, POST_API } from "../utils/https";

const initialState = {
  newsletter: [],
};

export const newsLetter = createSlice({
  name: "news",
  initialState,
  reducers: {
    news: (state, action) => {
      state.newsletter = action.payload;
    },
  },
});

export const createNews = (token, data, setTextVisible) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  const params = {
    topic: data,
  };
  try {
    const res = await axios({
      method: "POST",
      url: API_HOST + `/newsletter/newsletter/`,
      headers: localHeader,
      data: params,
    });
    // console.log("In createNews action", res.data);
    setTextVisible(true);
  } catch (error) {
    // console.log("createNews error", error.response);
    let params = {
      title: "An error occurred.",
      description: "Something went wrong.",
      status: "error",
      duration: 5000,
      isClosable: true,
    };
    Alerts(params);
  }
};

export const getNews = (token, setLoader) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  setLoader(true);
  try {
    const res = await axios({
      method: "GET",
      url: API_HOST + `/newsletter/getnews/`,
      headers: localHeader,
    });
    // console.log("In getNews action", res.data);
    dispatch(news(res.data.response));
    setLoader(false);
  } catch (error) {
    setLoader(false);
    // console.log("getNews error", error.response);
  }
};
export const { news } = newsLetter.actions;
export default newsLetter.reducer;
