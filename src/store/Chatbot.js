import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Alerts from "../utils/Alert";

import { API_HOST, configHeader, POST_API } from "../utils/https";
import { errorAlert } from "./Researcher";

const initialState = {
  chatbotDropdownData: [],
};

export const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setChatbotDropdownData: (state, action) => {
      state.chatbotDropdownData = action.payload;
    },
  },
});

export const getChatbotDropdownData = (token, setLoader) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  try {
    const response = await axios({
      method: "GET",
      url: `${API_HOST}/chatgpt/dropdownvalueschatbot/`,
      headers: localHeader,
    });
    // console.log("In getWriterDropdownData action", response.data);
    dispatch(setChatbotDropdownData(response.data));
    setLoader(false);
  } catch (error) {
    errorAlert(error);
    setLoader(false);
    console.log("Writer Dropdown Data error", error);
  }
};

export const { setChatbotDropdownData } = chatbotSlice.actions;
export default chatbotSlice.reducer;
