import { twMerge } from "tailwind-merge";
import Icon from "../Icon";

const Field = ({
  className,
  classInput,
  label,
  textarea,
  note,
  type,
  value,
  onChange,
  placeholder,
  required,
  icon,
  isDarkModeAllowed = true,
  ...otherProps
}) => {
  const handleKeyDown = (event) => {
    const remainingChars = 880 - value?.length;
    if (remainingChars <= 0 && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  const remainingChars = 880 - value?.length;

  return (
    <div className={`${className}`}>
      <div className="">
        {label && (
          <div className="flex mb-2 font-semibold capitalize base2">
            {label}
            {textarea && <span className="pl-4 ml-auto text-n-4/50">{remainingChars}</span>}
          </div>
        )}
        <div className="relative">
          {textarea ? (
            <textarea
              className={`w-full h-24 px-3.5 py-3 bg-n-2 border-2 border-n-2 rounded-xl base2  text-n-7 outline-none transition-colors placeholder:text-n-4/50 focus:bg-transparent resize-none ${
                icon && "pl-[3.125rem]"
              } ${value !== "" && "bg-transparent border-n-3/50"} ${classInput} ${
                isDarkModeAllowed &&
                "dark:bg-n-7 dark:border-n-5 dark:text-n-3 dark:focus:bg-transparent"
              }`}
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              required={required}
              {...otherProps}
            ></textarea>
          ) : (
            <input
              className={twMerge(
                `w-full h-13 px-3.5 bg-n-2 border-2 border-n-2 rounded-xl base2  text-n-7 outline-none transition-colors placeholder:text-n-4/50 focus:bg-transparent resize-none ${
                  icon && "pl-[3.125rem]"
                } ${value !== "" && "bg-transparent border-n-3/50"} ${classInput} ${
                  isDarkModeAllowed &&
                  "dark:bg-n-7 dark:border-n-5 dark:text-n-3 dark:focus:bg-transparent"
                }`
              )}
              type={type || "text"}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              {...otherProps}
            />
          )}
          <Icon
            className={`absolute top-3.5 left-4 fill-n-4/50 pointer-events-none transition-colors ${
              value !== "" && "fill-n-4"
            }`}
            name={icon}
          />
        </div>
        {note && <div className="mt-2 base2 text-n-4/50">{note}</div>}
        {/* <div className="mt-2 caption2 text-accent-1">
                Email is incorrect
            </div> */}
      </div>
    </div>
  );
};

export default Field;
