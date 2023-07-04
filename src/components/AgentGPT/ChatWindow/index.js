import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FaPause, FaPlay } from "react-icons/fa";

import PopIn from "../../Motions/PopIn";
import FadeIn from "../../Motions/FadeIn";
import { Switch } from "../../Switch";
import { ExampleAgentButton } from "../ExampleAgentButton";
import { ChatMessage } from "../ChatMessage";
import { isEmptyObject } from "../../../utils/helper";
import { MacWindowHeader, messageListId } from "../MacWindoHeader";

// import { useAgentStore } from "../../stores";
// import { ChatMessage } from "./ChatMessage";
// import { MacWindowHeader, messageListId } from "./MacWindowHeader";

const AUTOMATIC_MODE = "Automatic Mode";
const MESSAGE_TYPE_SYSTEM = "system";
const PAUSE_MODE = "Pause Mode";
const TASK_STATUS_EXECUTING = "executing";

const ChatWindow = ({
  messages,
  children,
  className = "",
  title,
  onSave,
  fullscreen = true,
  scrollToBottom = false,
  displaySettings = false,
  setAgentRun = () => {},
  visibleOnMobile = true,
  taskName = "",
  refreshing = false,
  handleRefreshClick = () => {},
}) => {
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  console.log("messages", messages);

  const scrollRef = useRef(null);
  // const isAgentPaused = useAgentStore.use.isAgentPaused();
  // const agentMode = useAgentStore.use.agentMode();
  // const agent = useAgentStore.use.agent();
  // const updateAgentMode = useAgentStore.use.updateAgentMode();

  const isAgentPaused = false;
  const agentMode = "Automatic Mode";
  const agent = null;
  const updateAgentMode = () => {};

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    // Use has scrolled if we have scrolled up at all from the bottom
    const hasUserScrolled = scrollTop < scrollHeight - clientHeight - 10;
    setHasUserScrolled(hasUserScrolled);
  };

  useEffect(() => {
    // Scroll to bottom on re-renders
    if (scrollToBottom && scrollRef && scrollRef.current) {
      if (!hasUserScrolled) {
        scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
      }
    }
  });

  const handleUpdateAgentMode = (value) => {
    updateAgentMode(value ? PAUSE_MODE : AUTOMATIC_MODE);
  };

  const getTaskStatus = (value) => {
    // // if (!isTask(value)) {
    //   return;
    // }
    // return value.status;
  };

  return (
    <div
      className={clsx(
        "border-translucent w-full flex-col rounded-2xl border-2 border-white/20 dark:bg-n-6 bg-n-1  dark:text-white text-n-6 shadow-2xl drop-shadow-lg py-2 ",
        className,
        visibleOnMobile ? "flex" : "hidden"
      )}
    >
      <MacWindowHeader
        title={title}
        messages={messages}
        onSave={onSave}
        taskName={taskName}
        refreshing={refreshing}
        handleRefreshClick={handleRefreshClick}
      />
      <div
        className={clsx(
          "mb-2 mr-2 ",
          (fullscreen && "max-h-[75vh] flex-grow overflow-auto") || "window-heights"
        )}
        ref={scrollRef}
        onScroll={handleScroll}
        id={messageListId}
      >
        {agent !== null && agentMode === PAUSE_MODE && isAgentPaused && (
          <FaPause className="absolute text-lg animation-hide left-1/2 top-1/2 Amd:text-3xl" />
        )}
        {agent !== null && agentMode === PAUSE_MODE && !isAgentPaused && (
          <FaPlay className="absolute text-lg animation-hide left-1/2 top-1/2 Amd:text-3xl" />
        )}
        {messages?.map((message, index) => {
          if (getTaskStatus(message) === TASK_STATUS_EXECUTING) {
            return null;
          }

          return (
            <FadeIn key={`${index}-${message.type}`}>
              <ChatMessage message={message} />
            </FadeIn>
          );
        })}
        {children}
        {messages.length === 0 && (
          <>
            <PopIn delay={0.8}>
              <ChatMessage
                message={{
                  type: MESSAGE_TYPE_SYSTEM,
                  value:
                    "👉 " +
                    "Create an agent by adding a name / goal, and hitting deploy!  examples below!",
                }}
              />
            </PopIn>
            <PopIn delay={1.5}>
              <div className="flex flex-col justify-between gap-2 m-2 sm:m-4 sm:flex-row">
                <ExampleAgentButton name="Platformer 🎮" setAgentRun={setAgentRun}>
                  Write some code to make a platformer game.
                </ExampleAgentButton>
                <ExampleAgentButton name="Travel 🌴" setAgentRun={setAgentRun}>
                  Plan a detailed trip to Hawaii.
                </ExampleAgentButton>
                <ExampleAgentButton name="Research 📜" setAgentRun={setAgentRun}>
                  Create a comprehensive report of the Nike company
                </ExampleAgentButton>
              </div>
            </PopIn>
          </>
        )}
      </div>
      {/* {displaySettings && (
        <div className="flex flex-row items-center justify-center">
          <SwitchContainer label={PAUSE_MODE}>
            <Switch
              disabled={agent !== null}
              value={agentMode === PAUSE_MODE}
              onChange={handleUpdateAgentMode}
            />
          </SwitchContainer>
        </div>
      )} */}
    </div>
  );
};

const SwitchContainer = ({ label, children }) => {
  return (
    <div className="flex items-center justify-center gap-2 px-2 py-2 m-1 border-2 rounded-lg w-38 border-white/20 bg-zinc-700">
      <p className="ext-sm ">{label}</p>
      {children}
    </div>
  );
};

export default ChatWindow;
