import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Alerts from "../utils/Alert";

import { API_HOST, configHeader, POST_API } from "../utils/https";

const initialState = {
  csvList: [],
};

export const dataAnalystSlice = createSlice({
  name: "dataAnalyst",
  initialState,
  reducers: {
    setCsvList: (state, action) => {
      state.csvList = action.payload;
    },
  },
});

export const uploadCsvAction =
  ({ token, data, setLoader }) =>
  async (dispatch) => {
    const localHeader = { "Content-Type": "multipart/form-data", Authorization: `Token ${token}` };
    setLoader(true);
    try {
      const response = await axios({
        method: POST_API,
        url: `${API_HOST}/pandaqa/csvView/`,
        headers: localHeader,
        data,
      });
      let params = {
        title: "Uploaded Successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      };
      Alerts(params);
    } catch (err) {
      let params = {
        title: "An error occurred.",
        description: err?.response?.data?.error || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      };
      console.log(`Post Pdf Error : `, err);
      Alerts(params);
    } finally {
      setLoader(false);
      dispatch(getCsvListAction({ token, setLoader }));
    }
  };

export const getCsvListAction =
  ({ token, setLoader, id = null }) =>
  async (dispatch) => {
    setLoader(true);
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };
    try {
      const response = await axios({
        method: "GET",
        url: id ? `${API_HOST}/pandaqa/csvView/${id}/` : `${API_HOST}/pandaqa/csvView/`,
        headers: localHeader,
      });
      dispatch(setCsvList(response.data));
    } catch (err) {
      let params = {
        title: "An error occurred.",
        description: err?.response?.data?.error || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      };
      console.log(`get Pdf Error : `, err);
      Alerts(params);
    } finally {
      setLoader(false);
    }
  };

export const selectCsvList = (state) => state.DataAnalyst.csvList;

export const { setCsvList } = dataAnalystSlice.actions;
export default dataAnalystSlice.reducer;
