import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Alerts from "../utils/Alert";

import { API_HOST, configHeader, POST_API } from "../utils/https";

const initialState = {
  pdfList: [],
};

export const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    setPdfList: (state, action) => {
      state.pdfList = action.payload;
    },
  },
});

export const uploadPdfAction =
  ({ token, data, setLoader }) =>
  async (dispatch) => {
    const localHeader = { "Content-Type": "multipart/form-data", Authorization: `Token ${token}` };
    setLoader(true);
    try {
      const response = await axios({
        method: POST_API,
        url: `${API_HOST}/pdfqa/pdfView/`,
        headers: localHeader,
        data,
      });
      let params = {
        title: "Pdf Uploaded Successfully.",
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
      dispatch(getPdfListAction({ token, setLoader }));
    }
  };

export const getPdfListAction =
  ({ token, setLoader, id = null }) =>
  async (dispatch) => {
    setLoader(true);
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };
    try {
      const response = await axios({
        method: "GET",
        url: id ? `${API_HOST}/pdfqa/pdfView/${id}/` : `${API_HOST}/pdfqa/pdfView/`,
        headers: localHeader,
      });
      dispatch(setPdfList(response.data));
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

export const selectPdfList = (state) => state.Qna.pdfList;

export const { setPdfList } = qnaSlice.actions;
export default qnaSlice.reducer;
