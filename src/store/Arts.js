import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Alerts from "../utils/Alert";

import { API_HOST, configHeader, POST_API } from "../utils/https";

const initialState = {
  arts: [],
  artsDetails: [],
  generatedArt: [],
};

export const art = createSlice({
  name: "arts",
  initialState,
  reducers: {
    artsHistory: (state, action) => {
      state.arts = action.payload;
    },
    artsHistoryDetails: (state, action) => {
      state.artsDetails = action.payload;
    },
    generatedArt: (state, action) => {
      state.generatedArt = action.payload;
    },
    clearArtDetails: (state) => {
      state.artsDetails = [];
    },
  },
});

export const getArts = (token) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  try {
    const res = await axios({
      method: "GET",
      url: API_HOST + `/img_generator/imageuserlist/`,
      headers: localHeader,
    });
    // console.log("In getArts action", res.data);
    dispatch(artsHistory(res.data.response));
  } catch (error) {
    // console.log("getArts error", error.response);
  }
};

export const getArtsImagesAction = (token, id) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  try {
    const res = await axios({
      method: "GET",
      url: API_HOST + `/img_generator/getimages/${id}`,
      headers: localHeader,
    });
    // console.log("In getArtsImagesAction action", res.data);
    dispatch(artsHistoryDetails(res.data.response));
  } catch (error) {
    // console.log("getArtsImagesAction error", error.response);
  }
};

export const generateArtAction = (token, data, setLoader) => async (dispatch) => {
  const localHeader = { ...configHeader, Authorization: `Token ${token}` };
  setLoader(true);
  try {
    const res = await axios({
      method: POST_API,
      url: API_HOST + `/img_generator/generateimage/`,
      headers: localHeader,
      data: data,
    });
    console.log("In generateArtAction action", res.data);
    let params = {
      title: "An error occurred.",
      description: res.data?.error || "Art generation failed.",
      status: "error",
      duration: 5000,
      isClosable: true,
    };
    if (res.data?.error) {
      Alerts(params);
      return;
    }
    dispatch(generatedArt(res.data.image_paths));
  } catch (error) {
    // console.log("generateArtAction error", error.response);
    // Alerts.error("Art generation failed");
    let params = {
      title: "An error occurred.",
      description: error.response.data.error || "Art generation failed.",
      status: "error",
      duration: 5000,
      isClosable: true,
    };
    Alerts(params);
  } finally {
    setLoader(false);
  }
};

export const clearArtDetailsAction = () => async (dispatch) => {
  dispatch(clearArtDetails());
};

export const { artsHistory, artsHistoryDetails, generatedArt, clearArtDetails } = art.actions;
export default art.reducer;
