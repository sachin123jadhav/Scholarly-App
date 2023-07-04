export const MESSAGE_TYPE_GOAL = "goal";
export const MESSAGE_TYPE_THINKING = "thinking";
export const MESSAGE_TYPE_TASK = "task";
export const MESSAGE_TYPE_ACTION = "action";
export const MESSAGE_TYPE_SYSTEM = "system";
export const MESSAGE_TYPE_ERROR = "error";
export const MESSAGE_TYPE_SEARCH = "search";

export const TASK_STATUS_STARTED = "started";
export const TASK_STATUS_EXECUTING = "executing";
export const TASK_STATUS_COMPLETED = "completed";
export const TASK_STATUS_FINAL = "final";

export const isAction = (value) => {
  return value.status === TASK_STATUS_COMPLETED;
};

/* Helper Functions */
export const getTaskStatus = (value) => {
  return value?.status;
};
