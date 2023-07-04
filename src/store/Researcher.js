import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import {
  MESSAGE_TYPE_TASK,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_EXECUTING,
  TASK_STATUS_STARTED,
} from "../Constants/agentTypes";
import Alerts from "../utils/Alert";

import { API_HOST, configHeader, POST_API } from "../utils/https";

export const errorAlert = (error) => {
  let params = {
    title: "An error occurred.",
    description: error?.response?.data?.error || "Something went wrong.",
    status: "error",
    duration: 5000,
    isClosable: true,
  };
  Alerts(params);
};

const initialState = {
  goal: {},
  taskList: [],
  tasks: [],
  newTask: [],
  newMessage: [],
};

export const researcherSlice = createSlice({
  name: "researcher",
  initialState,
  reducers: {
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
    setTasksList: (state, action) => {
      state.taskList = action.payload?.map((item) => {
        return {
          taskId: nanoid(),
          value: item,
          status: TASK_STATUS_STARTED,
          type: MESSAGE_TYPE_TASK,
        };
      });
    },
    setTasks: (state, action) => {
      const { task, IsNewTask } = action.payload;
      console.log("IsNewTask", IsNewTask);
      console.log("task", task);
      if (IsNewTask) {
        state.tasks = [
          ...state.tasks,
          {
            taskId: nanoid(),
            value: task,
            status: TASK_STATUS_STARTED,
            type: MESSAGE_TYPE_TASK,
          },
        ];
        return;
      }
      state.tasks = task.map((item) => {
        return {
          taskId: nanoid(),
          value: item,
          status: TASK_STATUS_STARTED,
          type: MESSAGE_TYPE_TASK,
        };
      });
      // state.tasks = { ...state.tasks, ...newTasks };
    },
    setNewTask: (state, action) => {
      state.newTask = action.payload?.map((item) => {
        return {
          taskId: nanoid(),
          value: item,
          status: TASK_STATUS_STARTED,
          type: MESSAGE_TYPE_TASK,
        };
      });
    },
    updateTaskStatus: (state, action) => {
      const { value, status } = action.payload;
      state.tasks = state.tasks.map((item) => {
        if (item.value === value) {
          return {
            ...item,
            status: status,
          };
        }
        return item;
      });
    },
    setNewMessage: (state, action) => {
      const { task, response } = action.payload;
      if (response?.arg) {
        state.newMessage = {
          value: response?.arg || "",
          info: response?.info || "",
          status: TASK_STATUS_EXECUTING,
          type: response?.action || MESSAGE_TYPE_TASK,
        };
      } else {
        state.newMessage = {
          value: task || "",
          info: response || "",
          status: TASK_STATUS_COMPLETED,
          type: response?.action || MESSAGE_TYPE_TASK,
        };
      }
    },
    ClearAllState: (state) => {
      state.goal = {};
      state.taskList = [];
      state.tasks = [];
      state.newTask = [];
      state.newMessage = [];
    },
  },
});

export const startResearch =
  ({ token, goal }) =>
  async (dispatch) => {
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };
    const payload = {
      goal: goal?.value,
      language: "English",
    };
    try {
      const response = await axios({
        method: POST_API,
        url: `${API_HOST}/agentgpt/start/`,
        data: payload,
        headers: localHeader,
      });
      dispatch(setGoal(goal));
      dispatch(setTasks({ task: response.data.response, IsNewTask: false }));
      dispatch(setTasksList(response.data.response));
      dispatch(setNewTask(response.data.response));
    } catch (error) {
      console.log(`Start Research Error : `, error);
      errorAlert(error);
    }
  };

export const analyzeResearch =
  ({ token, goal, currentTask, restTasks, setAgentStopping }) =>
  async (dispatch) => {
    console.log("currentTask", currentTask);
    console.log("restTasks", restTasks);
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };
    const payload = {
      goal: goal?.value,
      task: currentTask?.value,
    };
    try {
      const response = await axios({
        method: POST_API,
        url: `${API_HOST}/agentgpt/analyze/`,
        data: payload,
        headers: localHeader,
      });
      dispatch(setNewMessage({ task: currentTask, response: response?.data?.response }));
      dispatch(
        updateTaskStatus({
          value: currentTask?.value,
          status: TASK_STATUS_EXECUTING,
        })
      );
      dispatch(
        executeResearch({
          token: token,
          goal: goal?.value,
          currentTask: currentTask?.value,
          restTasks: restTasks,
          action: response?.data?.response?.action,
          arg: response?.data?.response?.arg,
          reasoning: response?.data?.response?.reasoning,
          setAgentStopping: setAgentStopping,
        })
      );
    } catch (error) {
      console.log(`Analyze Error : `, error);
      errorAlert(error);
    }
  };

export const executeResearch =
  ({ token, action, arg, reasoning, goal, currentTask, restTasks, setAgentStopping }) =>
  async (dispatch) => {
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };
    const payload = {
      action: action,
      arg: arg,
      reasoning: reasoning,
      goal: goal,
      language: "english",
      task: currentTask,
    };
    try {
      const response = await axios({
        method: POST_API,
        url: `${API_HOST}/agentgpt/execute/`,
        data: payload,
        headers: localHeader,
      });
      console.log("inside execute Research response", response.data.response);
      dispatch(setNewMessage({ task: currentTask, response: response?.data?.response }));
      dispatch(
        updateTaskStatus({
          value: currentTask,
          status: TASK_STATUS_COMPLETED,
        })
      );

      if (restTasks.length > 0) {
        console.log("inside restTasks.length > 0 in executeResearch");
        dispatch(
          createTask({
            token,
            goal,
            lastTask: currentTask,
            result: response?.data?.response,
            restTasks,
          })
        );
      } else {
        console.log("inside restTasks.length <= 0 in executeResearch");
        // dispatch(setAgentStopped(true));
        setAgentStopping(true);
      }
    } catch (error) {
      console.log(`Execute Error : `, error);
      errorAlert(error);
    }
  };

const createTask =
  ({ token, goal, lastTask, result, restTasks }) =>
  async (dispatch) => {
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };
    const payload = {
      goal,
      tasks: restTasks,
      lastTask,
      result,
      language: "English",
    };
    console.log("createTask payload", payload);
    try {
      const response = await axios({
        method: POST_API,
        url: `${API_HOST}/agentgpt/create/`,
        data: payload,
        headers: localHeader,
      });
      console.log("Create task response", response);
      dispatch(setTasks({ task: response.data.response, IsNewTask: true }));
      dispatch(setTasksList([...restTasks, response.data.response]));
      dispatch(setNewTask(response.data.response));
      // dispatch(setNewMessage({ task: lastTask, response: response?.data?.response }));
    } catch (error) {
      console.log(`Create Task Error : `, error);
      errorAlert(error);
    }
  };

export const selectPdfList = (state) => state.Qna.pdfList;

export const {
  setGoal,
  setTasks,
  updateTaskStatus,
  setNewMessage,
  setTasksList,
  setNewTask,
  ClearAllState,
} = researcherSlice.actions;
export default researcherSlice.reducer;
