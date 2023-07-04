import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Chatting from "../pages/Chatting";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage/index";
import Qna from "../pages/Qna";
import ArtGenerator from "../pages/ArtGenerator";
import NewsLetter from "../pages/NewsLetter";
import CreateNews from "../pages/NewsLetter/CreateNews";
import YourNews from "../pages/NewsLetter/YourNews";
import NewsDetails from "../pages/NewsLetter/NewsDetails";
import ImageGenerator from "../pages/ArtGenerator/ImageGenerator";
import ArtGeneratorHistory from "../pages/ArtGenerator/ArtGeneratorHistory";
import ArtGeneratorHistoryDetails from "../pages/ArtGenerator/ArtGeneratorHistoryDetails";
import AgentGpt from "../pages/AgentGPT";
import Prospector from "../pages/Prospector";
import Writer from "../pages/Writer";
import PdfQna from "../pages/Qna/Pdf";
import PdfChat from "../pages/Qna/Pdf/PdfChat";
import DataAnalyst from "../pages/DataAnalyst";
import DataAnalystChat from "../pages/DataAnalyst/DataAnalysChat";

import { getCurrentUserAction } from "../store/Auth";
import { ROUTES } from "./RouterConfig";
import ProspectorDataTable from "../pages/Prospector/ProspectorDataTable";
import ProspectorSaveDataTable from "../pages/Prospector/ProspectorSaveDataTable";

const MyRoutes = () => {
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrentUserAction(token));
  }, [isLoggedIn]);

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="*" element={<Navigate replace to={ROUTES.CHATTING} />} />
          <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
          <Route path={ROUTES.QNA} element={<Qna />} />
          <Route path={ROUTES.QNA_PDF} element={<PdfQna />} />
          <Route path={ROUTES.QNA_PDF_CHATTING} element={<PdfChat />} />
          <Route path={ROUTES.CHATTING} element={<Chatting />} />
          <Route path={ROUTES.DATA_ANALYST} element={<DataAnalyst />} />
          <Route path={ROUTES.DATA_ANALYST_CHATTING} element={<DataAnalystChat />} />
          <Route path={ROUTES.AGENT_GPT} element={<AgentGpt />} />
          <Route path={ROUTES.ART_GENERATOR} element={<ArtGenerator />} />
          <Route path={ROUTES.ART_GENERATOR_HISTORY} element={<ArtGeneratorHistory />} />
          <Route
            path={ROUTES.ART_GENERATOR_HISTORY_DETAILS}
            element={<ArtGeneratorHistoryDetails />}
          />
          <Route path={ROUTES.IMAGE_GENERATOR} element={<ImageGenerator />} />
          <Route path={ROUTES.NEWSLETTER} element={<NewsLetter />} />
          <Route path={ROUTES.NEWSLETTER_CREATE} element={<CreateNews />} />
          <Route path={ROUTES.NEWSLETTER_HISTORY} element={<YourNews />} />
          <Route path={ROUTES.NEWSLETTER_DETAILS} element={<NewsDetails />} />
          <Route path={ROUTES.PROSPECTOR} element={<Prospector />} />
          <Route path={ROUTES.PROSPECTOR_DATA_TABLE} element={<ProspectorDataTable />} />
          <Route path={ROUTES.PROSPECTOR_SAVE_DATA_TABLE} element={<ProspectorSaveDataTable />} />
          <Route path={ROUTES.WRITER} element={<Writer />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate replace to={ROUTES.SIGN_IN} />} />
          <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        </>
      )}
    </Routes>
  );
};

export default MyRoutes;
