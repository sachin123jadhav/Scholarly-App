import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { FaPlay, FaRobot, FaStar } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

import Layout from "../../components/Layout";
import Button from "../../components/AgentGPT/AgentButton";
import Expand from "../../components/Motions/Expand";
import ChatWindow from "../../components/AgentGPT/ChatWindow";
import Input from "../../components/AgentGPT/Input";
import { TaskWindow } from "../../components/AgentGPT/TaskWindow";
import { analyzeResearch, ClearAllState, startResearch } from "../../store/Researcher";
import { MESSAGE_TYPE_GOAL, TASK_STATUS_STARTED } from "../../Constants/agentTypes";
import { isEmptyOrBlank } from "../../utils/whitespace";
import { isEmptyObject } from "../../utils/helper";
// import PopIn from "../../components/Motions/PopIn";

const AgentGpt = () => {
  const token = useSelector((state) => state.Auth.token);
  const goal = useSelector((state) => state.Researcher.goal);
  const taskList = useSelector((state) => state.Researcher.taskList);
  const newTask = useSelector((state) => state.Researcher.newTask);
  const newMessages = useSelector((state) => state.Researcher.newMessage);

  // const getTasks = [
  //   {
  //     id: "0",
  //     taskId: "0",
  //     value: "Create a comprehensive report of the Nike company",
  //     status: "started",
  //     type: "goal",
  //   },
  //   {
  //     id: "1",
  //     taskId: "1",
  //     value: "Gather information about Nike's history, products, and current status in the market.",
  //     status: "started",
  //     type: "task",
  //   },
  //   {
  //     id: "2",
  //     taskId: "2",
  //     value:
  //       "Research Nike's competitors and analyze their strengths and weaknesses compared to Nike.",
  //     status: "started",
  //     type: "task",
  //   },
  //   {
  //     id: "3",
  //     taskId: "3",
  //     value:
  //       "Conduct surveys or interviews with customers or employees to gain insights into Nike's reputation and impact.",
  //     status: "started",
  //     type: "task",
  //   },
  //   {
  //     id: "4",
  //     taskId: "4",
  //     value:
  //       "Compile all the gathered data and analyze it to create a comprehensive report on Nike's performance, market position, and potential future opportunities.",
  //     status: "started",
  //     type: "task",
  //   },
  // ];

  const agent = null;

  const [nameInput, setNameInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [mobileVisibleWindow, setMobileVisibleWindow] = useState("Chat");
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [isAgentRunning, setAgentRunning] = useState(false);
  const [isAgentStopped, setAgentStopped] = useState(false);
  const [isAgentStopping, setAgentStopping] = useState(false);
  const [isAgentPaused, setAgentPaused] = useState(false);

  // const [showToolsDialog, setShowToolsDialog] = useState(false);
  // const [hasSaved, setHasSaved] = useState(false);

  const dispatch = useDispatch();
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (goal) {
      setMessages(() => {
        const newMessages = [];
        if (!isEmptyObject(goal)) newMessages.push(goal);
        return newMessages;
      });
    }
  }, [goal]);

  useEffect(() => {
    setTimeout(() => {
      if (newTask && newTask.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...newTask]);
      }
    }, 1000);
  }, [newTask]);

  useEffect(() => {
    if (!isEmptyObject(newMessages)) {
      setMessages((prevMessages) => {
        const tempNewMessages = [...prevMessages];
        tempNewMessages.push(newMessages);
        return tempNewMessages;
      });
    }
  }, [newMessages]);

  useEffect(() => {
    if (isAgentStopping || isAgentStopped) {
      console.log("inside is agent stopping");
      setAgentRunning(false);
      setAgentStopping(false);
      setAgentStopped(true);
      return;
    }
    if (!isAgentPaused && taskList && taskList.length > 0) {
      console.log("inside analyze research dispatch");
      const currentTask = taskList[0];
      const restTasks = taskList.slice(1).map((task) => task.value);
      dispatch(
        analyzeResearch({
          token,
          goal: goal,
          currentTask,
          restTasks,
          setAgentStopping,
        })
      );
    }
  }, [taskList, isAgentPaused, isAgentStopping, isAgentStopped]);

  const handleNewGoal = (name, goal) => {
    if (name.trim() === "" || goal.trim() === "") {
      return;
    }
    dispatch(
      startResearch({
        token,
        goal: {
          id: nanoid(),
          value: goal.trim(),
          status: TASK_STATUS_STARTED,
          type: MESSAGE_TYPE_GOAL,
        },
      })
    );
    setAgentRunning(true);
    setAgentStopped(false);
    setAgentStopping(false);
  };

  const handleVisibleWindowClick = (visibleWindow) => {
    // This controls whether the ChatWindow or TaskWindow is visible on mobile
    setMobileVisibleWindow(visibleWindow);
  };

  const handleStopAgent = () => {
    setAgentRunning(false);
    setAgentStopping(true);
  };

  const handleRefreshClick = () => {
    setRefreshing(true);
    setTimeout(() => {
      setMessages([]);
      setAgentRunning(false);
      setAgentStopped(false);
      setAgentStopping(false);
      setRefreshing(false);
      dispatch(ClearAllState());
    }, 1000);
  };

  const disableDeployAgent = isEmptyOrBlank(nameInput) || isEmptyOrBlank(goalInput);

  const firstButton =
    isAgentPaused && !isAgentStopped ? (
      <Button ping disabled={!isAgentPaused} onClick={() => {}}>
        <FaPlay size={20} />
        <span className="ml-2">CONTINUE</span>
      </Button>
    ) : (
      <Button
        ping={!disableDeployAgent}
        disabled={disableDeployAgent}
        onClick={() => handleNewGoal(nameInput, goalInput)}
      >
        {!isAgentRunning ? (
          "Deploy Agent"
        ) : (
          <>
            <VscLoading className="animate-spin" size={20} />
            <span className="ml-2">Running</span>
          </>
        )}
      </Button>
    );

  return (
    <Layout>
      <div className="relative px-5 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:px-6 md:px-5">
        <div className="flex flex-col">
          <main className="flex flex-row min-h-screen">
            <div className="z-10 flex items-center justify-center w-full min-h-screen p-2">
              <div className="flex flex-col items-center justify-center w-full max-w-screen-xl gap-3 2xl:gap-1 sm:py-5 md:justify-between">
                <div id="title" className="relative flex flex-col items-center">
                  <div className="flex flex-row items-start ">
                    <span className="text-5xl font-bold md:text-4xl">Researcher</span>
                  </div>
                  <div className="mt-1 text-center  text-[0.7em] font-bold dark:text-white">
                    <p>Assemble, configure, and deploy autonomous AI Agents in your browser.</p>
                  </div>
                </div>
                <div className="flex flex-row my-2">
                  <Button
                    className="rounded-r-none py-0 text-sm xl:py-[0.25em] hidden xl:flex 2xl:hidden"
                    disabled={mobileVisibleWindow === "Chat"}
                    onClick={() => handleVisibleWindowClick("Chat")}
                  >
                    Chat
                  </Button>
                  <Button
                    className="rounded-l-none py-0 text-sm xl:py-[0.25em] hidden xl:flex 2xl:hidden"
                    disabled={mobileVisibleWindow === "Tasks"}
                    onClick={() => handleVisibleWindowClick("Tasks")}
                  >
                    Tasks
                  </Button>
                </div>
                <Expand className="flex flex-row w-full">
                  <ChatWindow
                    messages={messages}
                    title={nameInput}
                    onSave={
                      // shouldShowSave
                      //   ? (format) => {
                      //       setHasSaved(true);
                      //       agentUtils.saveAgent({
                      //         goal: goalInput.trim(),
                      //         name: nameInput.trim(),
                      //         tasks: messages,
                      //       });
                      //     }
                      //   : undefined
                      () => {}
                    }
                    scrollToBottom
                    displaySettings
                    // setAgentRun={setAgentRun}
                    visibleOnMobile={mobileVisibleWindow === "Chat"}
                    taskName={nameInput}
                    refreshing={refreshing}
                    handleRefreshClick={handleRefreshClick}
                  />
                  <TaskWindow visibleOnMobile={mobileVisibleWindow === "Tasks"} />
                </Expand>
                <div className="flex flex-col w-full gap-2 md:m-2 xl:m-6 2xl:m-6">
                  <Expand delay={1.2} className="flex flex-row items-end gap-2 md:items-center">
                    <Input
                      inputRef={nameInputRef}
                      left={
                        <>
                          <FaRobot />
                          <span className="ml-2">Name</span>
                        </>
                      }
                      value={nameInput}
                      disabled={agent != null}
                      onChange={(e) => setNameInput(e.target.value)}
                      // onKeyDown={(e) => handleKeyPress(e)}
                      onKeyDown={() => {}}
                      placeholder="Researcher"
                      type="text"
                    />
                  </Expand>
                  <Expand delay={1.3}>
                    <Input
                      left={
                        <>
                          <FaStar />
                          <span className="ml-2">Goal</span>
                        </>
                      }
                      disabled={agent != null}
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      onKeyDown={() => {}}
                      placeholder="Make the world a better place"
                      type="textarea"
                    />
                  </Expand>
                </div>
                <Expand delay={1.4} className="flex justify-center w-full gap-2 sm:flex-col">
                  {firstButton}
                  <Button
                    disabled={!isAgentRunning}
                    onClick={handleStopAgent}
                    enabledClassName="bg-red-600 hover:bg-red-400"
                  >
                    {isAgentStopped === false && isAgentStopping === true ? (
                      <>
                        <VscLoading className="animate-spin" size={20} />
                        <span className="ml-2">Stopping</span>
                      </>
                    ) : (
                      "Stop Agent"
                    )}
                  </Button>
                </Expand>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

// const AgentGpt = () => {
//   return (
//     <Layout>
//       <div className="flex items-center justify-center h-screen">
//         <PopIn delay={0.5}>
//           <h1 className="h-1">Coming soon ...</h1>
//         </PopIn>
//       </div>
//     </Layout>
//   );
// };

export default AgentGpt;
