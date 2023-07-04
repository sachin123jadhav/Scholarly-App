import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
// import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Switch as ChakraSwitch } from "@chakra-ui/react";

const Switch = ({ value, disabled = false, onChange }) => {
  const [checked, setChecked] = useState(false);

  // Due to SSR, we should only change the internal state after the initial render
  useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleChange = (checked) => {
    onChange(checked);
  };

  return (
    // <SwitchPrimitive.Root
    //   className={clsx(
    //     "group",
    //     "radix-state-checked:bg-sky-600 radix-state-unchecked:bg-zinc-500 dark:radix-state-unchecked:bg-zinc-500",
    //     "relative inline-flex h-4 w-7 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
    //     "focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75",
    //     disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer "
    //   )}
    //   disabled={disabled}
    //   onCheckedChange={handleChange}
    //   checked={checked}
    // >
    //   <SwitchPrimitive.Thumb
    //     className={clsx(
    //       "group-radix-state-checked:translate-x-3",
    //       "group-radix-state-unchecked:translate-x-0",
    //       "pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
    //     )}
    //   />
    // </SwitchPrimitive.Root>
    <ChakraSwitch isChecked={checked} onChange={(e) => handleChange(e.target.checked)} />
  );
};

export { Switch };
