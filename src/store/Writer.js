import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_HOST, configHeader } from "./../utils/https";
import Alerts from "../utils/Alert";
import { errorAlert } from "./Researcher";

const initialState = {
  filterParameters: [],
  writerDropdownData: [],
};

export const writerSlice = createSlice({
  name: "writer",
  initialState,
  reducers: {
    setFilterParameters: (state, action) => {
      state.filterParameters = action.payload;
    },
    setWriterDropdownData: (state, action) => {
      state.writerDropdownData = action.payload;
    },
  },
});

export const getFilterParameters = (setLoader) => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${API_HOST}/chatgpt/0penaiplaygroundview/`,
      headers: configHeader,
    });
    dispatch(setFilterParameters(res.data));
    setLoader(false);
  } catch (error) {
    errorAlert(error);
    setLoader(false);
    console.log("Filter Parameter error", error);
  }
};

export const getWriterDropdownData = (token, setLoader) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  try {
    const response = await axios({
      method: "GET",
      url: `${API_HOST}/chatgpt/dropdownvalues/`,
      headers: localHeader,
    });
    // console.log("In getWriterDropdownData action", response.data);
    dispatch(setWriterDropdownData(response.data));
    setLoader(false);
  } catch (error) {
    errorAlert(error);
    setLoader(false);
    console.log("Writer Dropdown Data error", error);
  }
};

export const generateCompletionResponse =
  ({ token, data, handleGeneratedResponse, handleButtonLoader, task }) =>
  async (dispatch) => {
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };
    handleButtonLoader({ loader: true, button: task });
    try {
      const response = await axios({
        method: "POST",
        url: `${API_HOST}/chatgpt/chatcompletion/`,
        headers: localHeader,
        data: data,
      });
      // console.log("In generateResponse action", response.data);
      handleGeneratedResponse(response.data.response);
    } catch (error) {
      errorAlert(error);
      console.log("Generate Response error", error);
    } finally {
      handleButtonLoader({ loader: false, button: task });
    }
  };

export const { setFilterParameters, setWriterDropdownData } = writerSlice.actions;
export default writerSlice.reducer;
