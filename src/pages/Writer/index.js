import React, { useState, Fragment, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "@chakra-ui/react";

import Field from "../../components/Field";
import Layout from "../../components/Layout";
import Select from "../../components/Select";
import RangeSlider from "../../components/SliderRange";
import {
  generateCompletionResponse,
  getFilterParameters,
  getWriterDropdownData,
} from "../../store/Writer";
import { isEmptyObject } from "../../utils/helper";

const Writer = () => {
  const token = useSelector((state) => state.Auth.token);
  const filterParameters = useSelector((state) => state.Writer.filterParameters);
  const writerDropdownData = useSelector((state) => state.Writer.writerDropdownData);

  const [selectedTask, setSelectedTask] = useState("");
  const [previousTask, setPreviousTask] = useState("");
  const [value, setValue] = useState("");
  const [sliderParameters, setSliderParameters] = useState({});
  const [inputParameters, setInputParameters] = useState({});
  const [dropdownValues, setDropdownValues] = useState([]);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState({
    generate: false,
    undo: false,
    regenerate: false,
  });

  const dispatch = useDispatch();
  const isTab = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  useEffect(() => {
    dispatch(getFilterParameters(setLoader));
    dispatch(getWriterDropdownData(token, setLoader));
  }, [dispatch, token]);

  useEffect(() => {
    if (isEmptyObject(writerDropdownData)) {
      return;
    }
    setDropdownValues(writerDropdownData);
  }, [writerDropdownData]);

  useEffect(() => {
    if (isEmptyObject(filterParameters)) {
      return;
    }
    setSliderParameters(() => {
      const initialParameters = {};
      // Iterate over the keys in the data object and set the initial state
      Object.keys(filterParameters.parameters).forEach((key) => {
        if (filterParameters.parameters[key].type === "number") {
          initialParameters[key] = filterParameters.parameters[key].default;
        }
      });
      return initialParameters;
    });
    setInputParameters(() => {
      const initialParameters = {};
      Object.keys(filterParameters.parameters).forEach((key) => {
        if (filterParameters.parameters[key].type === "integer") {
          initialParameters[key] = filterParameters.parameters[key].default;
        }
      });
      return initialParameters;
    });
  }, [filterParameters]);

  const disableButton = !value || Object.values(buttonLoader).some((value) => value === true);
  const transformedName = (name) => name.split("_").join(" ");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSliderParameterChange = (newValue, name) => {
    setSliderParameters((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleInputParameterChange = (e) => {
    const { value, name } = e.target;
    setInputParameters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (value) => {
    setSelectedTask(value);
    setValue(value.value);
  };

  const handleButtonLoader = ({ loader, button }) => {
    setButtonLoader((prev) => ({ ...prev, [button]: loader }));
  };

  const handleGeneratedResponse = (response) => {
    setPreviousTask(value);
    setValue((prev) => prev + response);
  };

  const handleRegenerate = () => {
    if (!previousTask || disableButton) {
      return;
    }
    setValue(previousTask);
    const payload = {
      questions: previousTask,
      temperature: sliderParameters?.temperature || 0,
      max_tokens: inputParameters?.max_tokens || 400,
      top_p: sliderParameters?.top_p || 1,
      frequency_penalty: sliderParameters?.frequency_penalty || 0,
      presence_penalty: sliderParameters?.presence_penalty || 0,
      stop: null,
    };
    dispatch(
      generateCompletionResponse({
        token,
        data: payload,
        handleGeneratedResponse,
        handleButtonLoader,
        task: "regenerate",
      })
    );
  };

  const handleGenerate = () => {
    if (!value || disableButton) {
      return;
    }

    const payload = {
      questions: value,
      temperature: sliderParameters?.temperature || 0,
      max_tokens: inputParameters?.max_tokens || 400,
      top_p: sliderParameters?.top_p || 1,
      frequency_penalty: sliderParameters?.frequency_penalty || 0,
      presence_penalty: sliderParameters?.presence_penalty || 0,
      stop: null,
    };
    dispatch(
      generateCompletionResponse({
        token,
        data: payload,
        handleGeneratedResponse,
        handleButtonLoader,
        task: "generate",
      })
    );
  };

  return (
    <Layout headerStyle="md:pt-4 lg:pt-0">
      <div className="grid h-screen grid-cols-5 p-2 gap-x-2 lg:grid-cols-1 px-5 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:px-6 md:px-5 min-h-[60vh">
        <div className="flex flex-col max-h-screen col-span-4 lg:col-span-1 ">
          <div className="flex items-center px-10 border-b border-n-3 shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.06)] 2xl:px-6 lg:pr-20 md:pl-5 md:pr-18 -mt-2 py-3 md:pt-0 dark:border-n-5 dark:shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.15)]">
            <div className="mr-auto truncate h5 md:h6">Writer</div>
            <Select
              label=""
              className="w-1/3 pr-3 mr-3 xl:w-1/2 shrink-0 md:pr-0"
              items={dropdownValues}
              value={selectedTask}
              onChange={handleDropdownChange}
              classButton="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
              placeholder="Examples"
            />
          </div>
          <div className="relative p-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5 min-h-[60vh] ">
            <textarea
              className={`w-full h-full px-3.5 py-3 bg-n-2 border-2 border-n-2 rounded-xl base2  text-n-7 outline-none transition-colors placeholder:text-n-4/50 focus:bg-transparent resize-none dark:bg-n-7 dark:border-n-5 dark:text-n-3 dark:focus:bg-transparent $ ${
                value !== "" && "bg-transparent border-n-3/50"
              }`}
              value={value}
              onChange={handleChange}
              placeholder="Enter your text here"
              required
            />
          </div>
          {isTab && (
            <div className="border-t border-n-3 dark:border-n-6">
              <Disclosure defaultOpen={false}>
                <Disclosure.Button className="flex w-full py-6 transition-colors h6 hover:text-primary-1 tap-highlight-color lg:hover:text-n-7 dark:lg:hover:text-n-1">
                  <div className="relative shrink-0 w-8 h-8 mr-8 before:absolute before:top-1/2 before:l-1/2 before:w-4 before:h-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-n-6 before:rounded-full after:absolute after:top-1/2 after:l-1/2 after:w-0.5 after:h-4 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-n-6 after:rounded-full after:transition-transform after:ui-open:rotate-90 md:mr-6 dark:before:bg-n-3 dark:after:bg-n-3"></div>
                  <div className="text-left">Parameters</div>
                </Disclosure.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-100 ease-in"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="pb-6 -mt-4 base1 ">
                    <div className="grid grid-cols-1 mx-6 gap-x-2">
                      <div className="px-4">
                        {!isEmptyObject(filterParameters) &&
                          Object.keys(filterParameters?.parameters)?.map((key) => {
                            const {
                              type,
                              default: defaultValue,
                              min,
                              max,
                              step = 0.01,
                            } = filterParameters?.parameters[key] || {};
                            return (
                              <div className="flex flex-col my-5" key={key}>
                                {type === "number" && (
                                  <RangeSlider
                                    title={transformedName(key)}
                                    min={min}
                                    max={max}
                                    step={step}
                                    startPoint={defaultValue}
                                    value={sliderParameters[key]}
                                    handleChange={(newValue) =>
                                      handleSliderParameterChange(newValue, key)
                                    }
                                  />
                                )}
                                {type === "integer" && (
                                  <Field
                                    label={transformedName(key)}
                                    type="number"
                                    value={inputParameters[key]}
                                    onChange={handleInputParameterChange}
                                    name={key}
                                  />
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </Disclosure>
            </div>
          )}
          <div className="relative px-10 pb-6 z-5 before:absolute before:-top-6 before:left-0 before:right-6 before:bottom-1/2 before:bg-gradient-to-b before:to-n-1 before:from-n-1/0 before:pointer-events-none 2xl:px-6 2xl:pb-5 md:px-4 md:pb-4 dark:before:to-n-6 dark:before:from-n-6/0">
            <div className="relative flex overflow-hidden gap-x-2 z-2 ">
              <button
                className={twMerge(
                  `w-full max-w-[15rem] my-3 cursor-pointer dark:btn-stroke-dark btn-stroke-light btn-blue ${
                    disableButton && "cursor-not-allowed opacity-60 btn"
                  }`
                )}
                onClick={handleGenerate}
              >
                {buttonLoader.generate ? <Spinner /> : "Generate"}
              </button>
              <button
                className={twMerge(
                  `w-full max-w-[15rem] my-3 cursor-pointer dark:btn-stroke-dark btn-stroke-light ${
                    disableButton && "cursor-not-allowed opacity-60 "
                  }`
                )}
              >
                {buttonLoader.undo ? <Spinner /> : "Undo"}
              </button>
              <button
                className={twMerge(
                  `w-full max-w-[15rem] my-3 cursor-pointer dark:btn-stroke-dark btn-stroke-light ${
                    disableButton && "cursor-not-allowed opacity-60 "
                  }`
                )}
                onClick={handleRegenerate}
              >
                {buttonLoader.regenerate ? <Spinner /> : "Regenerate"}
              </button>
            </div>
          </div>
        </div>

        {!isTab && (
          <div className="border-l-2">
            <div className="text-center h4">Parameters</div>
            <div className="px-4 mt-5">
              {!isEmptyObject(filterParameters) &&
                Object?.keys(filterParameters?.parameters)?.map((key) => {
                  const {
                    type,
                    default: defaultValue,
                    min,
                    max,
                    step = 0.01,
                  } = filterParameters?.parameters[key] || {};
                  return (
                    <div className="flex flex-col my-5" key={key}>
                      {type === "number" && (
                        <RangeSlider
                          title={transformedName(key)}
                          min={min}
                          max={max}
                          step={step}
                          startPoint={defaultValue}
                          value={sliderParameters[key]}
                          handleChange={(newValue) => handleSliderParameterChange(newValue, key)}
                        />
                      )}
                      {type === "integer" && (
                        <Field
                          name={key}
                          label={transformedName(key)}
                          type="number"
                          value={inputParameters[key]}
                          onChange={handleInputParameterChange}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Writer;
