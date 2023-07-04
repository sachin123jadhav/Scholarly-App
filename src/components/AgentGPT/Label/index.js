import React from "react";
import clsx from "clsx";
import Tooltip from "../Tooltip";

const Label = ({ type = "", left = null, toolTipProperties = { message: "", disabled: true } }) => {
  const isTypeTextArea = () => {
    return type === "textarea";
  };

  return (
    <Tooltip sideOffset={0} toolTipProperties={toolTipProperties}>
      <div
        className={clsx(
          "flex min-w-[8em] items-center justify-center rounded-xl rounded-r-none",
          type !== "range" && "dark:border-white/10 border-n-3 smd:border-0 border-2 border-r-0",
          "py-3 text-sm font-semibold tracking-wider transition-all md:py-2 2xl:text-lg md:text-sm",
          isTypeTextArea() && "h-full"
        )}
      >
        {left}
      </div>
    </Tooltip>
  );
};

export default Label;
