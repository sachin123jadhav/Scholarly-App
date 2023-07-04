import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";

import Icon from "../../../components/Icon";
import Layout from "../../../components/Layout";
import Message from "../../../components/Message";
import { getPdfListAction, selectPdfList, uploadPdfAction } from "../../../store/QnA";
import { ROUTES } from "../../../routes/RouterConfig";
import Chat from "../../../components/Chat";

const PdfQna = () => {
  const token = useSelector((state) => state.Auth.token);
  const pdfList = useSelector(selectPdfList);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPdfListAction({ token, setLoader }));
  }, [dispatch, token]);

  const handleUpload = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      return;
    }

    const payload = {
      pdf: selectedFile,
    };
    dispatch(uploadPdfAction({ token, data: payload, setLoader }));
    setSelectedFile(null);
  };

  const handleStartChat = (id, pdfName) => {
    navigate(ROUTES.QNA_PDF_CHATTING, {
      state: {
        id,
        pdfName,
      },
    });
  };

  const getPdFName = (url) => {
    if (!url) {
      return "";
    }
    const urlParts = url?.split("/");
    const pdfName = urlParts[urlParts.length - 1];
    return pdfName;
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Layout>
      <Chat
        title="PDF QnA"
        backIcon
        handleBackClick={handleBackClick}
        // className="xl:-mt-0 md:-mt-13 md:pb-5"
      >
        {!loader ? (
          // <div className="relative px-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
          <div className="px-6">
            <Message
              placeholder="Select a file to upload"
              isAddFile
              setSelectedFile={setSelectedFile}
              document={selectedFile?.name}
              onClick={handleUpload}
              acceptedFile=".pdf"
            />
            <div className="grid grid-cols-2 px-5 mx-6 md:grid-cols-1 gap-x-2">
              {Array.isArray(pdfList) &&
                pdfList?.map((item) => {
                  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                  const pdfName = getPdFName(item.pdf);
                  return (
                    <div
                      className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
                      key={item.id}
                      onClick={() => handleStartChat(item.id, pdfName)}
                    >
                      <div className="relative flex items-center justify-center mr-6 w-15 h-15">
                        <div
                          className="absolute inset-0 opacity-20 rounded-xl"
                          style={{ backgroundColor: color }}
                        ></div>
                        <div className="w-[2.625rem] mx-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="42"
                            height="48"
                            fill="none"
                            viewBox="0 0 42 48"
                          >
                            <path
                              className="stroke-[#D9D9D9] dark:stroke-n-5"
                              d="M36 47H6a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5h20.721a5 5 0 0 1 3.402 1.336l9.279 8.616A5 5 0 0 1 41 14.616V42a5 5 0 0 1-5 5z"
                              strokeWidth="2"
                            />
                            <path
                              d="M22.991 14.124a1 1 0 0 0-1.761-.764l-8.929 10.715-.424.537c-.108.156-.304.462-.31.865a1.5 1.5 0 0 0 .557 1.189c.313.253.674.298.863.315.199.018.444.018.684.018h6.195l-.86 6.876a1 1 0 0 0 1.761.764l8.93-10.715.424-.537c.108-.156.304-.462.31-.865a1.5 1.5 0 0 0-.557-1.189c-.313-.253-.674-.298-.863-.315a8.14 8.14 0 0 0-.685-.018h-6.195l.86-6.876z"
                              fill={color}
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="w-9/12 text-base font-semibold truncate md:text-sm">
                        {pdfName}
                      </p>
                      <Icon
                        className="ml-auto transition-colors fill-n-4 group-hover:fill-n-7 dark:group-hover:fill-n-4"
                        name="arrow-next"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-n-7">
            <Spinner thickness="4px" speed="0.65s" size="xl" />
          </div>
        )}
      </Chat>
    </Layout>
  );
};

export default PdfQna;
