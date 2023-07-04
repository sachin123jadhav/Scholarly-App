import React, { useState } from "react";
import clsx from "clsx";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import ComboBox from "../ComboBox";
import Label from "../Label";
import { isArrayOfType } from "../../../utils/helper";

const Input = ({
  small = true,
  placeholder = "",
  left = null,
  value,
  type,
  onChange,
  setValue = () => {},
  disabled = false,
  attributes = {},
  inputRef = null,
  toolTipProperties = { message: "", disabled: true },
  onKeyDown = () => {},
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const isTypeCombobox = () => {
    return type === "combobox";
  };

  const isTypeRange = () => {
    return type === "range";
  };

  const isTypeTextArea = () => {
    return type === "textarea";
  };

  const isTypePassword = () => {
    return type === "password";
  };

  const handleApiKeyToggle = (e) => {
    setIsHidden(!isHidden);
  };

  let inputElement;
  const options = attributes?.options;

  if (
    isTypeCombobox() &&
    isArrayOfType(options, "string") &&
    setValue !== undefined &&
    typeof value === "string"
  ) {
    inputElement = (
      <ComboBox
        value={value}
        options={options}
        disabled={disabled}
        onChange={setValue}
        styleClass={{
          container: "relative w-full",
          options:
            "absolute right-0 top-full z-20 mt-1 max-h-48 w-full overflow-auto rounded-xl border-2 border-white/10 bg-[#3a3a3a] tracking-wider shadow-xl outline-0 transition-all",
          input: `border:black delay-50 sm:flex w-full items-center justify-between rounded-xl border-2 border-white/10 bg-transparent px-2 py-2 text-sm tracking-wider outline-0 transition-all hover:border-[#1E88E5]/40 focus:border-[#1E88E5] sm:py-3 md:text-lg ${
            disabled ? "cursor-not-allowed hover:border-white/10" : ""
          } ${left ? "md:rounded-l-none" : ""}`,
          option:
            "cursor-pointer px-2 py-2  text-sm text-white/75 hover:bg-blue-500 sm:py-3 md:text-sm",
        }}
      />
    );
  } else if (isTypeTextArea()) {
    inputElement = (
      <textarea
        className={clsx(
          "border:black delay-50 min-h-14 w-full resize-none rounded-xl border-2 dark:border-white/10 border-n-3 dark:bg-[#3a3a3a] bg-n-2/70 p-2 md:py-2 2xl:py-3 text-sm tracking-wider outline-0 transition-all placeholder:text-white/20 hover:border-[#1E88E5]/40 focus:border-[#1E88E5] sm:h-20 md:text-sm 2xl:text-base",
          disabled && "cursor-not-allowed hover:border-white/10",
          left && "smd:rounded-lg rounded-l-none"
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...attributes}
      />
    );
  } else if (isTypePassword()) {
    inputElement = (
      <div
        className={clsx(
          "flex w-full flex-row items-center overflow-clip rounded-xl border-2 border-white/10 dark:bg-[#3a3a3a] bg-n-2/70 px-2 hover:border-[#1E88E5]/40 focus:border-[#1E88E5]",
          disabled && "cursor-not-allowed hover:border-white/10",
          left && "2xl:rounded-l-none",
          small && "text-sm sm:py-[0]"
        )}
      >
        <input
          className={clsx(
            "delay-50 w-full  flex-grow overflow-ellipsis md:py-2 2xl:py-3 bg-transparent py-1 text-sm tracking-wider outline-0 transition-all  placeholder:text-white/20 sm:py-3 md:text-lg"
          )}
          ref={inputRef}
          placeholder={placeholder}
          type={isHidden ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onKeyDown={onKeyDown}
          {...attributes}
        />
        <div
          className="flex-none p-2 rounded-full cursor-pointer hover:bg-white/20"
          onClick={(e) => handleApiKeyToggle(e)}
        >
          {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
      </div>
    );
  } else {
    inputElement = (
      <input
        className={clsx(
          "border:black delay-50 w-full rounded-xl dark:bg-[#3a3a3a] bg-n-2/70 md:py-2 2xl:py-3 2xl:text-lg tracking-wider outline-0 transition-all placeholder:text-white/20 hover:border-[#1E88E5]/40 focus:border-[#1E88E5] sm:py-3 md:text-sm",
          !isTypeRange() && "border-2 dark:border-white/10 border-n-3  px-2",
          disabled && " cursor-not-allowed hover:border-white/10",
          left && "smd:rounded-lg rounded-l-none",
          small && "text-sm"
        )}
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...attributes}
      />
    );
  }

  return (
    <div
      className={clsx(
        `items-left z-5 flex h-fit w-full flex-row rounded-xl text-lg dark:text-white/75 shadow-xl smd:flex-col bg-n-2 smd:bg-transparent dark:bg-[#3a3a3a]`,
        isTypeRange() && "smd:border-white/10  smd:border-2",
        `shadow-xl smd:items-start  `
      )}
    >
      {left && <Label left={left} type={type} toolTipProperties={toolTipProperties} />}
      {inputElement}
      {isTypeRange() && (
        <p className="w-1/6 px-0 m-auto mx-4 text-sm text-center md:text-lg">{value}</p>
      )}
    </div>
  );
};

export default Input;
