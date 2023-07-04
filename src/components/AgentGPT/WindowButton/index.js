import React from "react";
import clsx from "clsx";

import Ping from "../Ping";

// type WindowButtonProps = {
//   ping?: boolean, // Toggles the ping animation
//   onClick?: () => void,
//   icon: React.ReactNode,
//   name: string,
//   border?: boolean,
// };

const WindowButton = ({ ping = false, onClick, icon, name, border }) => {
  return (
    <div
      className={clsx(
        "relative flex h-8 cursor-pointer items-center gap-2 dark:bg-[#3a3a3a] bg-n-2 p-2  text-sm font-bold transition-all hover:bg-white/10",
        border && "rounded-lg border border-white/30 hover:border-[#1E88E5]/40 hover:bg-[#6b6b6b]"
      )}
      onClick={onClick}
    >
      {ping ? <Ping color="blue" /> : <></>}
      {icon}
      <p className="font-mono text-gray/50">{name}</p>
    </div>
  );
};

export default WindowButton;
