import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineReload } from "react-icons/ai";

import Answer from "../../components/Answer";
import Chat from "../../components/Chat";
import Layout from "../../components/Layout";
import Message from "../../components/Message";
import Question from "../../components/Question";
import { API_HOST, configHeader } from "../../utils/https";

const DataAnalystChat = () => {
  const token = useSelector((state) => state.Auth.token);

  const [loader, setLoader] = useState(false);
  const [serverQuestion, setServerQuestion] = useState("");
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const bottomRef = useRef(null);

  const { id, csvName } = state;

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const ServerAnswer = (answer) => {
    const { data } = answer;
    return (
      <div className="">
        <pre className="whitespace-pre-wrap font-inter">
          {data ? data : "Something went wrong, Please try again or contact support"}
        </pre>
      </div>
    );
  };

  const handleQuestion = (data) => async (dispatch) => {
    setData((prevData) => [
      ...prevData,
      {
        question: data,
        answer: null,
        text: null,
        time: moment(new Date()),
      },
    ]);
    setLoader(true);
    setServerQuestion(" ");
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };

    let params = {
      csv_id: id + "",
      question: data,
    };
    try {
      const res = await axios({
        method: "POST",
        url: API_HOST + `/pandaqa/pandaqa/`,
        data: params,
        headers: localHeader,
      });
      console.log("In handleQuestion action", res.data);
      if (res.data) {
        setData((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.question === data) {
              return {
                ...item,
                answer: res.data.output,
              };
            }
            return item;
          });
          return updatedData;
        });
      }
      setLoader(false);
    } catch (error) {
      console.log("handleQuestion error", error?.response?.data?.response);
      setLoader(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of the enter key
      dispatch(handleQuestion(serverQuestion));
    }
  };

  const handleRefreshClick = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData([]);
      setRefreshing(false);
    }, 300);
  };

  return (
    <Layout>
      <Chat
        title={csvName}
        backIcon
        handleBackClick={() => window.history.back()}
        headerRightComponent={
          <button
            onClick={handleRefreshClick}
            className="flex items-center justify-center px-4 py-2 cursor-pointer"
          >
            {refreshing ? (
              <RxCross1 className="w-5 h-5 mr-3 dark:text-white animate-pulse" />
            ) : (
              <AiOutlineReload className="w-5 h-5 mr-3 dark:text-white" />
            )}
          </button>
        }
      >
        {data !== [] &&
          data.map((item, index, array) => {
            const { question, answer, time } = item;
            return (
              <>
                {question && <Question content={question} time={time.fromNow()} />}
                {index === array.length - 1 ? (
                  loader ? (
                    <Answer loading />
                  ) : (
                    <Answer time="Just now">
                      <ServerAnswer data={answer} />
                    </Answer>
                  )
                ) : (
                  <Answer time="Just now">
                    <ServerAnswer data={answer} />
                  </Answer>
                )}
              </>
            );
          })}
        <div ref={bottomRef}></div>
      </Chat>
      <Message
        placeholder="Enter your Question here ..."
        value={serverQuestion}
        onChange={(e) => setServerQuestion(e.target.value)}
        onClick={() => dispatch(handleQuestion(serverQuestion))}
        onKeyDown={handleKeyDown}
      />
    </Layout>
  );
};

export default DataAnalystChat;
