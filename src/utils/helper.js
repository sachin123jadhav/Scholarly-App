import {
  FaBrain,
  FaCheckCircle,
  FaCircleNotch,
  FaExclamationTriangle,
  FaRegCheckCircle,
  FaStar,
  FaStopCircle,
  FaThumbtack,
} from "react-icons/fa";
import {
  getTaskStatus,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_GOAL,
  MESSAGE_TYPE_SEARCH,
  MESSAGE_TYPE_THINKING,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_EXECUTING,
  TASK_STATUS_FINAL,
  TASK_STATUS_STARTED,
} from "../Constants/agentTypes";

export const getMessageContainerStyle = (message) => {
  if (message.type) {
    switch (message.type) {
      case "error":
        return "border-yellow-400";
      default:
    }
  }

  switch (message.status) {
    case TASK_STATUS_STARTED:
      return "border-white/20 hover:border-white/40";
    case TASK_STATUS_EXECUTING:
      return "border-white/20 hover:border-white/40";
    case TASK_STATUS_COMPLETED:
      return "border-green-500 hover:border-green-400";
    case TASK_STATUS_FINAL:
      return "border-green-500 hover:border-green-400";
    default:
      return "";
  }
};

export const getTaskStatusIcon = (message, config) => {
  const taskStatusIconClass = "mr-1 mb-1 inline-block";
  const { isAgentStopped } = config;

  switch (message.type) {
    case MESSAGE_TYPE_GOAL:
      return <FaStar className="text-yellow-300" />;
    case MESSAGE_TYPE_THINKING:
      return <FaBrain className="mt-[0.1em] text-pink-400" />;
    case MESSAGE_TYPE_ERROR:
      return <FaExclamationTriangle className="text-yellow-400" />;
    case MESSAGE_TYPE_SEARCH:
      return "🔍";
    default:
      break;
  }

  if (getTaskStatus(message) === TASK_STATUS_STARTED) {
    return <FaThumbtack className={`${taskStatusIconClass} -rotate-45`} />;
  } else if (getTaskStatus(message) === TASK_STATUS_EXECUTING) {
    return isAgentStopped ? (
      <FaStopCircle className={`${taskStatusIconClass}`} />
    ) : (
      <FaCircleNotch className={`${taskStatusIconClass} animate-spin`} />
    );
  } else if (getTaskStatus(message) === TASK_STATUS_COMPLETED) {
    return (
      <FaRegCheckCircle className={`${taskStatusIconClass} text-green-500 hover:text-green-400`} />
    );
  } else if (getTaskStatus(message) === TASK_STATUS_FINAL) {
    return (
      <FaCheckCircle className={`${taskStatusIconClass} text-green-500 hover:text-green-400`} />
    );
  }
};

export const isArrayOfType = (arr, type) => {
  return (
    Array.isArray(arr) &&
    arr.every((item) => {
      if (typeof type === "string") {
        return typeof item === type;
      } else {
        return item instanceof type;
      }
    })
  );
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
