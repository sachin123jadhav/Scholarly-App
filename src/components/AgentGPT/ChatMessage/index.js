import React from "react";
import clsx from "clsx";

import {
  isAction,
  MESSAGE_TYPE_GOAL,
  MESSAGE_TYPE_SEARCH,
  MESSAGE_TYPE_SYSTEM,
  MESSAGE_TYPE_THINKING,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_FINAL,
  TASK_STATUS_STARTED,
} from "../../../Constants/agentTypes";
import { getMessageContainerStyle, getTaskStatusIcon, isEmptyObject } from "../../../utils/helper";
import MarkdownRenderer from "../MarkdownRenderer";

const ChatMessage = ({ message }) => {
  if (isEmptyObject(message)) return null;
  return (
    <div
      className={clsx(
        getMessageContainerStyle(message),
        "mx-2 my-1 rounded-lg border bg-white/20 p-2 text-xs hover:border-[#1E88E5]/40 sm:mx-4 sm:p-3",
        "sm:my-1.5 sm:text-sm"
      )}
    >
      {message.type !== MESSAGE_TYPE_SYSTEM && (
        // Avoid for system messages as they do not have an icon and will cause a weird space
        <>
          <div className="mr-2 inline-block h-[0.9em]">{getTaskStatusIcon(message, {})}</div>
          {/* <span className="mr-2 font-bold">{t(getMessagePrefix(message), { ns: "chat" })}</span> */}
          <span className="mr-2 font-bold">{getMessagePrefix(message)}</span>
        </>
      )}

      {message.type === MESSAGE_TYPE_THINKING && (
        <span className="italic text-zinc-400">
          {/* {`${t("RESTART_IF_IT_TAKES_X_SEC", {
            ns: "chat",
          })}`} */}
          {`${"Restart if it takes more than 30 seconds"}`}
        </span>
      )}

      {isAction(message) ? (
        <>
          <hr className="my-2 border border-white/20" />
          <div className="prose">
            <MarkdownRenderer>{message.info || ""}</MarkdownRenderer>
          </div>
        </>
      ) : (
        <>
          {/* <span>{t(message.value, { ns: "chat" })}</span> */}
          <span>{message.value}</span>
          {
            // Link to the FAQ if it is a shutdown message
            message.type === MESSAGE_TYPE_SYSTEM &&
              (message.value.toLowerCase().includes("shut") ||
                message.value.toLowerCase().includes("error")) && <FAQ />
          }
        </>
      )}
    </div>
  );
};
// Returns the translation key of the prefix
const getMessagePrefix = (message) => {
  if (message.type === MESSAGE_TYPE_GOAL) {
    return "EMBARKING_ON_NEW_GOAL";
  } else if (message.type === MESSAGE_TYPE_THINKING) {
    return "THINKING";
  } else if (message.type === MESSAGE_TYPE_SEARCH) {
    return "Searching the web for ";
  } else if (message.status === TASK_STATUS_STARTED) {
    return "TASK_ADDED";
  } else if (message.status === TASK_STATUS_COMPLETED) {
    return `Completing: ${message.value}`;
  } else if (message.status === TASK_STATUS_FINAL) {
    return "NO_MORE_TASKS";
  }
  return "";
};

const FAQ = () => {
  return (
    <p>
      <br />
      If you are facing issues, please head over to our{" "}
      <a href="https://docs.reworkd.ai/faq" className="text-sky-500">
        FAQ
      </a>
    </p>
  );
};
export { ChatMessage };
