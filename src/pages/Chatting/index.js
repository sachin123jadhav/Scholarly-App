import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineReload } from "react-icons/ai";

import Answer from "../../components/Answer";
import Code from "../../components/Code/index";
import Layout from "../../components/Layout";
import Message from "../../components/Message";
import Question from "../../components/Question";
import Select from "../../components/Select";
import { API_HOST, configHeader } from "../../utils/https";
import { isEmptyObject } from "../../utils/helper";
import { getChatbotDropdownData } from "../../store/Chatbot";

// const ClipGuidancePresetOptions = [
//   {
//     id: 1,
//     title: "Fast Blue",
//     value: "FAST_BLUE",
//   },
//   {
//     id: 2,
//     title: "Fast Green",
//     value: "FAST_GREEN",
//   },
//   {
//     id: 3,
//     title: "None",
//     value: "NONE",
//   },
//   {
//     id: 4,
//     title: "Simple",
//     value: "SIMPLE",
//   },
//   {
//     id: 5,
//     title: "Slow",
//     value: "SLOW",
//   },
//   {
//     id: 6,
//     title: "Slowest",
//     value: "SLOWEST",
//   },
//   {
//     id: 7,
//     title: "Slower",
//     value: "SLOWER",
//   },
// ];

const Chatting = () => {
  const dispatch = useDispatch();

  const bottomRef = React.useRef();

  const token = useSelector((state) => state.Auth.token);
  const chatbotDropdownData = useSelector((state) => state.Chatbot.chatbotDropdownData);
  // console.log("chatbotDropdownData", chatbotDropdownData);

  const [data, setData] = useState([]);
  const [serverQuestion, setServerQuestion] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [dropdownValues, setDropdownValues] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log("data", data);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  useEffect(() => {
    dispatch(getChatbotDropdownData(token, setLoader));
  }, [dispatch, token]);

  useEffect(() => {
    if (isEmptyObject(chatbotDropdownData)) {
      return;
    }
    setDropdownValues(chatbotDropdownData);
  }, [chatbotDropdownData]);

  const handleQuestion = (data) => async (dispatch) => {
    setData((prevData) => [
      ...prevData,
      {
        question: data,
        answer: null,
        code: null,
        text: null,
        time: moment(new Date()),
      },
    ]);
    setLoader(true);
    setServerQuestion("");
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };

    let params = {
      questions: data,
      dropdown: selectedTask?.value || null,
    };
    try {
      const res = await axios({
        method: "POST",
        url: API_HOST + `/chatgpt/azurechat/`,
        data: params,
        headers: localHeader,
      });
      console.log("In handleQuestion action", res.data);
      if (res.data) {
        setData((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.question === data) {
              let parts = res.data.response.split("```");
              let codeString = "";
              let textString = "";

              for (let i = 0; i < parts.length; i++) {
                if (i % 2 === 0) {
                  textString += parts[i];
                } else {
                  codeString += parts[i];
                }
              }

              return {
                ...item,
                answer: res.data.response,
                code: codeString.trim(),
                text: textString.trim(),
              };
            }
            return item;
          });
          return updatedData;
        });
      }

      setLoader(false);
    } catch (error) {
      console.log("handleQuestion error", error?.response?.data.response);
      setLoader(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of the enter key
      dispatch(handleQuestion(serverQuestion));
    }
  };

  const ServerAnswer = (data) => {
    const dte = data.data.text;
    return (
      <div className="">
        <pre className="whitespace-pre-wrap font-inter">
          {dte ? dte : "Something went wrong. Please try again or contact support"}
        </pre>
      </div>
    );
  };
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the state value here
      setCount((prevCount) => prevCount + 1);
    }, 60000); // 60,000 milliseconds = 1 minute

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const handleDropdownChange = (value) => {
    setSelectedTask(value);
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
      <div className="flex items-center min-h-[4.5rem] px-10 py-3 md:pb-3 md:pt-12 border-b border-n-3 shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.06)] 2xl:px-6 xl:-mt-0 md:-mt-18 lg:pr-20 md:pl-5 md:pr-18 dark:border-n-5 dark:shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.15)]">
        <div className="mr-auto truncate h5 md:h6">Chatbot</div>
        <Select
          label=""
          className="w-1/3 pr-3 mr-3 xl:w-1/2 shrink-0 md:pr-0"
          items={dropdownValues}
          value={selectedTask}
          onChange={handleDropdownChange}
          classButton="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
          placeholder="Select"
        />
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
      </div>
      <div className="relative p-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
        {data !== [] &&
          data.map((item, index, array) => {
            return (
              <>
                {item.question && <Question content={item.question} time={item.time.fromNow()} />}
                {index === array.length - 1 ? (
                  loader ? (
                    <Answer loading />
                  ) : (
                    <Answer time={item.time.fromNow()}>
                      <ServerAnswer data={item} />
                      {item.code && (
                        <Code
                          items={[
                            {
                              id: "0",
                              title: "Code",
                              language: "JS",
                              value: item.code,
                            },
                          ]}
                        />
                      )}
                    </Answer>
                  )
                ) : (
                  <Answer time="Just now">
                    <ServerAnswer data={item} />
                    {item.code && (
                      <Code
                        items={[
                          {
                            id: "0",
                            title: "Code",
                            language: "JS",
                            value: item.code,
                          },
                        ]}
                      />
                    )}
                  </Answer>
                )}
              </>
            );
          })}
        <div ref={bottomRef} />
      </div>
      <Message
        value={serverQuestion}
        onChange={(e) => setServerQuestion(e.target.value)}
        onClick={() => dispatch(handleQuestion(serverQuestion))}
        onKeyDown={handleKeyDown}
      />
    </Layout>
  );
};

export default Chatting;
