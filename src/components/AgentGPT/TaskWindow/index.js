import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { FaListAlt, FaTimesCircle } from "react-icons/fa";
import clsx from "clsx";

import Expand from "../../Motions/Expand";
import FadeIn from "../../Motions/FadeIn";
import { getMessageContainerStyle, getTaskStatusIcon } from "../../../utils/helper";
import { MESSAGE_TYPE_TASK, TASK_STATUS_STARTED } from "../../../Constants/agentTypes";

// export const tasks = [
//   {
//     id: "1",
//     taskId: "1",
//     value: "Gather information about Nike's history, products, and current status in the market.",
//     status: "completed",
//     type: "task",
//   },
//   {
//     id: "2",
//     taskId: "2",
//     value:
//       "Research Nike's competitors and analyze their strengths and weaknesses compared to Nike.",
//     status: "executing",
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

export const TaskWindow = ({ visibleOnMobile }) => {
  const tasks = useSelector((state) => state.Researcher.tasks);

  const [customTask, setCustomTask] = useState("");
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    console.log("tasks: ", tasks);
    setTaskList(tasks);
  }, [tasks]);

  const addMessage = () => {};

  // const handleAddTask = () => {
  //   addMessage({
  //     id: nanoid().toString(),
  //     taskId: nanoid().toString(),
  //     value: customTask,
  //     status: TASK_STATUS_STARTED,
  //     type: MESSAGE_TYPE_TASK,
  //   });
  //   setCustomTask("");
  // };

  return (
    <Expand
      className={clsx(
        "w-[30%] flex-col items-center rounded-2xl border-2 border-white/20 dark:bg-n-7 bg-n-1 shadow-2xl mx-2 2xl:flex 2xl:w-[20rem] xl:w-full 2xl:px-1",
        !visibleOnMobile && "xl:hidden"
      )}
    >
      <div className="sticky top-0 flex items-center justify-center gap-2 p-2 my-2 dark:text-gray-100 text-n-6 dark:bg-n-7 bg-n-1 ">
        <FaListAlt /> Current tasks
      </div>
      <div className="flex flex-col w-full h-full gap-2 px-1 py-1">
        <div className="flex flex-col w-full gap-2 pr-1 overflow-x-hidden overflow-y-auto max-h-[65vh]">
          {tasks?.length === 0 && (
            <p className="w-full p-2 text-base text-center dark:text-n-1 text-n-6 2xl:text-sm">
              This window will display agent tasks as they are created.
            </p>
          )}
          <AnimatePresence>
            {taskList?.map((task, i) => (
              <Task key={i} index={i} task={task} />
            ))}
          </AnimatePresence>
        </div>
        {/* <div className="flex flex-row gap-2 mb-2">
          <Input
            value={customTask}
            onChange={(e) => setCustomTask(e.target.value)}
            placeholder="Custom task"
            small
          />
          <Button
            className="font-sm px-2 py-[0] text-sm sm:px-2 sm:py-[0]"
            onClick={handleAddTask}
            disabled={!customTask || agent == null}
          >
            Add
          </Button>
        </div> */}
      </div>
    </Expand>
  );
};

export const Task = ({ task, index }) => {
  //   const isAgentStopped = useAgentStore.use.isAgentStopped();
  //   const deleteTask = useMessageStore.use.deleteTask();
  //   const isTaskDeletable = task.taskId && !isAgentStopped && task.status === "started";

  const isAgentStopped = false;
  const isTaskDeletable = false;

  const handleDeleteTask = () => {
    if (isTaskDeletable) {
      //   deleteTask(task.taskId as string);
    }
  };

  return (
    <FadeIn>
      <div
        className={clsx(
          "w-full animate-[rotate] rounded-md border-2 p-2 text-xs dark:text-white text-n-6",
          isAgentStopped && "opacity-50",
          getMessageContainerStyle(task)
        )}
      >
        {getTaskStatusIcon(task, { isAgentStopped })}
        <span>{task.value}</span>
        <div className="flex justify-end">
          <FaTimesCircle
            onClick={handleDeleteTask}
            className={clsx(
              isTaskDeletable && "cursor-pointer hover:text-red-500",
              !isTaskDeletable && "cursor-not-allowed opacity-30"
            )}
            size={12}
          />
        </div>
      </div>
    </FadeIn>
  );
};
