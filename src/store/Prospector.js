import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Alerts from "../utils/Alert";

import { API_HOST, configHeader, POST_API } from "../utils/https";
import { errorAlert } from "./Researcher";

const initialState = {
  scrapData: [],
  scrapTableData: [],
  savedScrapData: [],
};

export const prospectorSlice = createSlice({
  name: "prospector",
  initialState,
  reducers: {
    setScrapData: (state, action) => {
      state.scrapData = action.payload;
    },
    setScrapTableData: (state, action) => {
      state.scrapTableData = action.payload;
    },
    setSavedScrapData: (state, action) => {
      state.savedScrapData = action.payload;
    },
    clearProspectorData: (state) => {
      state.scrapData = [];
      state.scrapTableData = [];
      state.savedScrapData = [];
    },
  },
});

export const getScrapData = (token, setLoader) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  try {
    const response = await axios({
      method: "GET",
      url: `${API_HOST}/lead/getdatasetid/`,
      headers: localHeader,
    });
    dispatch(setScrapData(response.data.response));
    setLoader(false);
  } catch (error) {
    errorAlert(error);
    setLoader(false);
    console.log("Scrap Data error", error);
  }
};

export const getScrapTableData = (token, data, setLoader) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  setLoader(true);
  try {
    const response = await axios({
      method: "POST",
      url: `${API_HOST}/lead/getdatasetdata/`,
      headers: localHeader,
      data,
    });
    dispatch(setScrapTableData(response.data.response));
    setLoader(false);
  } catch (error) {
    errorAlert(error);
    setLoader(false);
    console.log("Scrap Data error", error);
  }
};

export const saveScrapData = (token, data, setLoader) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  setLoader(true);
  try {
    const response = await axios({
      method: POST_API,
      url: `${API_HOST}/lead/insertpropectordata/`,
      headers: localHeader,
      data,
    });
    let params = {
      title: "Data Saved Successfully",
      description: response?.data?.response || "The selected data has been successfully saved.",
      status: "success",
    };
    Alerts(params);
    setLoader(false);
  } catch (error) {
    errorAlert(error);
    setLoader(false);
    console.log("Scrap Data error", error);
  }
};

export const getSavedScrapData = (token, data, setLoader) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  setLoader(true);
  try {
    const response = await axios({
      method: POST_API,
      url: `${API_HOST}/lead/getprospectordata/`,
      headers: localHeader,
      data,
    });
    dispatch(setSavedScrapData(response.data.response));
    setLoader(false);
  } catch (error) {
    errorAlert(error);
    setLoader(false);
    console.log("Scrap Data error", error);
  }
};

export const clearProspectorDataAction = () => (dispatch) => {
  dispatch(clearProspectorData());
};

export const selectScrapData = (state) => state.Prospector.scrapData;
export const selectScrapTableData = (state) => state.Prospector.scrapTableData;
export const selectSavedScrapData = (state) => state.Prospector.savedScrapData;

export const { setScrapData, setScrapTableData, setSavedScrapData, clearProspectorData } =
  prospectorSlice.actions;
export default prospectorSlice.reducer;
