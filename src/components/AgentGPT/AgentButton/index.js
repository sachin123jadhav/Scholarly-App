import React, { forwardRef, useState } from "react";
import clsx from "clsx";

import Ping from "../Ping";
import Loader from "../Loader/Loader";

const Button = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const onClick = (e) => {
    if (props.loader === true) setLoading(true);

    try {
      void Promise.resolve(props.onClick?.(e)).then();
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <button
      ref={ref}
      type={props.type}
      disabled={loading || props.disabled}
      className={clsx(
        "text-gray/50 relative md:w-full rounded-lg border-2 border-white/30 px-4 py-1 font-bold transition-all sm:px-10 sm:py-3",
        props.disabled &&
          "cursor-not-allowed border-white/10 dark:bg-zinc-900 btn-dark dark:text-white/30",
        props.disabled ||
          "mou cursor-pointer dark:bg-[#1E88E5]/70 bg-[#1E88E5] text-white/80 hover:border-white/80 hover:bg-[#0084f7] hover:text-white hover:shadow-2xl",
        props.disabled || props.enabledClassName,
        props.className
      )}
      onClick={onClick}
    >
      {props.ping ? <Ping color="white" /> : <></>}
      <div className="flex items-center justify-center">
        {loading ? (
          <Loader />
        ) : (
          <>
            {props.icon ? <div className="mr-2">{props.icon}</div> : null}
            {props.children}
          </>
        )}
      </div>
    </button>
  );
});

Button.displayName = "Button";
export default Button;
