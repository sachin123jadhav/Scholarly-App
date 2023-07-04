import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import sessionStorage from "redux-persist/es/storage/session";

import { authSlice } from "./Auth";
import { qnaSlice } from "./QnA";
import { newsLetter } from "./NewsLetter";
import { art } from "./Arts";
import { researcherSlice } from "./Researcher";
import { writerSlice } from "./Writer";
import { chatbotSlice } from "./Chatbot";
import { prospectorSlice } from "./Prospector";
import { dataAnalystSlice } from "./DataAnalyst";

const reducers = combineReducers({
  Auth: authSlice.reducer,
  Qna: qnaSlice.reducer,
  NewsLetter: newsLetter.reducer,
  Arts: art.reducer,
  Researcher: researcherSlice.reducer,
  Writer: writerSlice.reducer,
  Chatbot: chatbotSlice.reducer,
  Prospector: prospectorSlice.reducer,
  DataAnalyst: dataAnalystSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["Auth"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
