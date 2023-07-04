import { useColorMode } from "@chakra-ui/color-mode";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RangeSlider = ({
  className = "",
  title,
  max = 50,
  min = 50,
  step = 1,
  value = 0,
  handleChange,
}) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <div className={className}>
      <div className="flex items-center justify-between caption2">
        <div className="capitalize base2">{title}</div>
        <div>{value < 1 ? value : `+${value}`}</div>
      </div>
      <div className="relative">
        <div className="absolute z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.125rem] h-[0.5rem] bg-n-5 pointer-events-none dark:bg-n-5"></div>
        <Slider
          min={min}
          max={max}
          startPoint={0}
          step={step}
          value={value}
          onChange={handleChange}
          handleStyle={{
            zIndex: 2,
            width: "1rem",
            height: "1rem",
            marginTop: "-0.4rem",
            boxShadow: "none",
            backgroundColor: isDarkMode ? "#E8ECEF" : "#343839",
            border: `0.125rem solid ${isDarkMode ? "#141718" : "#FEFEFE"}`,
            opacity: 1,
          }}
          trackStyle={{
            backgroundColor: isDarkMode ? "#E8ECEF" : "#343839",
            borderRadius: "0",
          }}
          railStyle={{
            height: "0.25rem",
            backgroundColor: isDarkMode ? "#2A2E2F" : "#E8E9E9",
          }}
          dotStyle={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
