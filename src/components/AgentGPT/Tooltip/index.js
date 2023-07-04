import React from "react";
// import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";

const Tooltip = ({
  children,
  toolTipProperties = { message: "", disabled: true },
  style = { container: "" },
  sideOffset,
}) => {
  const { message, disabled } = toolTipProperties;
  //   return (
  //     <div className={style?.container}>
  //       <TooltipPrimitive.Provider>
  //         <TooltipPrimitive.Root delayDuration={0}>
  //           <TooltipPrimitive.Trigger asChild>{child}</TooltipPrimitive.Trigger>
  //           {disabled ? null : (
  //             <TooltipPrimitive.Portal>
  //               <TooltipPrimitive.Content
  //                 className="will-change animation-transform user-select-none z-40 w-3/5 rounded-sm bg-black px-3.5 py-2.5 text-white shadow-lg "
  //                 sideOffset={sideOffset}
  //               >
  //                 <span className="whitespace-pre-line">{message}</span>
  //                 <TooltipPrimitive.Arrow className="fill-black" />
  //               </TooltipPrimitive.Content>
  //             </TooltipPrimitive.Portal>
  //           )}
  //         </TooltipPrimitive.Root>
  //       </TooltipPrimitive.Provider>
  //     </div>
  //   );
  return (
    <div className={style?.container}>
      <ChakraTooltip
        label={message}
        isDisabled={disabled}
        hasArrow
        arrowSize={5}
        bg="black"
        padding={2}
        color="white"
      >
        {children}
      </ChakraTooltip>
    </div>
  );
};

export default Tooltip;
