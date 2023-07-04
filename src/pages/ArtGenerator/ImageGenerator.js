import React, { useEffect, useRef, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";

import Field from "../../components/Field";
import Layout from "../../components/Layout";
import Select from "../../components/Select";
import Alerts from "../../utils/Alert";
import Chat from "../../components/Chat";
import { ROUTES } from "../../routes/RouterConfig";
import { API_HOST, configHeader } from "../../utils/https";

// Clip Guidance Preset
const ClipGuidancePresetOptions = [
  {
    id: 1,
    title: "Fast Blue",
    value: "FAST_BLUE",
  },
  {
    id: 2,
    title: "Fast Green",
    value: "FAST_GREEN",
  },
  {
    id: 3,
    title: "None",
    value: "NONE",
  },
  {
    id: 4,
    title: "Simple",
    value: "SIMPLE",
  },
  {
    id: 5,
    title: "Slow",
    value: "SLOW",
  },
  {
    id: 6,
    title: "Slowest",
    value: "SLOWEST",
  },
  {
    id: 7,
    title: "Slower",
    value: "SLOWER",
  },
];

const defaultFormData = {
  prompt: "",
  height: 512,
  width: 512,
  sample: 1,
};

const defaultAdvancedFormData = {
  cfgScale: 7,
  steps: 10,
  numberOfCutouts: 64,
  gradientAccumulateEvery: 1,
};

const defaultOption = [
  { id: 1, title: "Yes", value: true },
  { id: 2, title: "No", value: false },
];

const ImageGenerator = () => {
  const { token } = useSelector((state) => state.Auth);

  const [generatedImage, setGeneratedImage] = useState([]);
  const [ClipGuidancePreset, setClipGuidancePreset] = useState(ClipGuidancePresetOptions[0]);
  const [formData, setFormData] = useState(defaultFormData);
  const [advancedFormData, setAdvancedFormData] = useState(defaultAdvancedFormData);
  const [randomizeNoise, setRandomizeNoise] = useState(defaultOption[0]);
  const [displayOutput, setDisplayOutput] = useState(defaultOption[0]);
  const [displayCaption, setDisplayCaption] = useState(defaultOption[0]);
  const [noPast, setNoPast] = useState(defaultOption[0]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const imageContainerRef = useRef(null);
  const { prompt, height, width, sample } = formData;
  const { cfgScale, steps, numberOfCutouts, gradientAccumulateEvery } = advancedFormData;

  useEffect(() => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedImage]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnChangeAdvanced = (e) => {
    const { name, value } = e.target;
    setAdvancedFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateArtAction = async (data) => {
    const localHeader = { ...configHeader, Authorization: `Token ${token}` };
    setLoader(true);
    try {
      const res = await axios({
        method: "POST",
        url: API_HOST + `/img_generator/generateimage/`,
        headers: localHeader,
        data: data,
      });
      let params = {
        title: "An error occurred.",
        description: res.data?.error || "Art generation failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      };
      if (res.data?.error) {
        Alerts(params);
        return;
      }
      setGeneratedImage(res.data.image_paths);
    } catch (error) {
      let params = {
        title: "An error occurred.",
        description: error.response?.data?.error || "Art generation failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      };
      Alerts(params);
    } finally {
      setLoader(false);
    }
  };

  const payload = {
    prompt: prompt,
    height: height,
    width: width,
    cfg_scale: cfgScale,
    clip_guidance_preset: ClipGuidancePreset?.value,
    steps: steps,
    samples: sample,
    randomize_noise: randomizeNoise?.value,
    num_cutouts: numberOfCutouts,
    display_output: displayOutput?.value,
    display_caption: displayCaption?.value,
    no_past: noPast?.value,
    gradient_accumulate_every: gradientAccumulateEvery,
  };

  const handleGenerateImage = (e) => {
    e.preventDefault();
    console.log("payload", payload);
    // dispatch(generateArtAction(token, payload, setLoader));
    generateArtAction(payload);
  };

  const handleBackClick = () => {
    navigate(ROUTES.ART_GENERATOR);
  };

  return (
    <Layout>
      <Chat title="Art Generator" backIcon handleBackClick={handleBackClick}>
        <div className="relative z-10 grid gap-4 p-4 mb-8 overflow-y-auto md:block grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
          <form onSubmit={handleGenerateImage}>
            <Field
              className="mb-3 mr-3 grow md:mr-0"
              classInput="dark:bg-n-6 dark:border-n-6 dark:focus:bg-transparent"
              label="Prompt"
              placeholder="Enter prompt here "
              name="prompt"
              value={prompt}
              onChange={handleOnChange}
              required
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
              <Field
                className="mb-3 mr-3 grow md:mr-0"
                classInput="dark:bg-n-6 dark:border-n-6 dark:focus:bg-transparent"
                label="Height"
                placeholder="Height"
                name="height"
                value={height}
                type="number"
                onChange={handleOnChange}
                required
              />
              <Field
                className="mb-3 mr-3 grow md:mr-0"
                classInput="dark:bg-n-6 dark:border-n-6 dark:focus:bg-transparent"
                label="Width"
                placeholder="Width"
                name="width"
                value={width}
                type="number"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
              <Field
                className="mb-3 mr-3 grow md:mr-0"
                classInput="dark:bg-n-6 dark:border-n-6 dark:focus:bg-transparent"
                label="Sample"
                placeholder="Sample"
                name="sample"
                value={sample}
                type="number"
                onChange={handleOnChange}
                required
              />
              <Select
                label="Clip Guidance Preset"
                className="w-full pr-3 mr-3 shrink-0 md:pr-0"
                items={ClipGuidancePresetOptions}
                value={ClipGuidancePreset}
                onChange={setClipGuidancePreset}
                classButton="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
              />
            </div>
            <div className="border-t border-n-3 dark:border-n-6">
              <Disclosure defaultOpen={false}>
                <Disclosure.Button className="flex w-full py-6 transition-colors h6 hover:text-primary-1 tap-highlight-color lg:hover:text-n-7 dark:lg:hover:text-n-1">
                  <div className="relative shrink-0 w-8 h-8 mr-8 before:absolute before:top-1/2 before:l-1/2 before:w-4 before:h-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-n-6 before:rounded-full after:absolute after:top-1/2 after:l-1/2 after:w-0.5 after:h-4 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-n-6 after:rounded-full after:transition-transform after:ui-open:rotate-90 md:mr-6 dark:before:bg-n-3 dark:after:bg-n-3"></div>
                  <div className="text-left">Advance Option</div>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="pb-6 -mt-4 base1 ">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                      <Field
                        className="mb-3 mr-3 grow md:mr-0"
                        classInput="dark:bg-n-6 dark:border-n-6 dark:focus:bg-transparent"
                        label="CFG Scale"
                        placeholder="CFG Scale"
                        name="cfgScale"
                        value={cfgScale}
                        type="number"
                        onChange={handleOnChangeAdvanced}
                        required
                      />
                      <Field
                        className="mb-3 mr-3 grow md:mr-0"
                        classInput="dark:bg-n-6 dark:border-n-6 dark:focus:bg-transparent"
                        label="Steps"
                        placeholder="Steps"
                        name="steps"
                        value={steps}
                        type="number"
                        onChange={handleOnChangeAdvanced}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                      <Field
                        className="mb-3 mr-3 grow md:mr-0"
                        classInput="dark:bg-n-6 dark:border-n-6 dark:focus:bg-transparent"
                        label="Gradient Accumulate Every"
                        placeholder="Gradient Accumulate Every"
                        name="gradientAccumulateEvery"
                        value={gradientAccumulateEvery}
                        type="number"
                        onChange={handleOnChangeAdvanced}
                        required
                      />
                      <Field
                        className="mb-3 mr-3 grow md:mr-0"
                        classInput="dark:bg-n-6 dark:border-n-6 dark:focus:bg-transparent"
                        label="Number of Cutouts"
                        placeholder="Number of Cutouts"
                        name="numberOfCutouts"
                        value={numberOfCutouts}
                        type="number"
                        onChange={handleOnChangeAdvanced}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                      <Select
                        label="Randomize Noise"
                        className="w-full pr-3 mr-3 shrink-0 md:pr-0"
                        items={defaultOption}
                        value={randomizeNoise}
                        onChange={setRandomizeNoise}
                        classButton="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                      />
                      <Select
                        label="Display Output"
                        className="w-full pr-3 mr-3 shrink-0 md:pr-0"
                        items={defaultOption}
                        value={displayOutput}
                        onChange={setDisplayOutput}
                        classButton="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                      <Select
                        label="Randomize Noise"
                        className="w-full pr-3 mr-3 shrink-0 md:pr-0"
                        items={defaultOption}
                        value={displayCaption}
                        onChange={setDisplayCaption}
                        classButton="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                      />
                      <Select
                        label="Display Output"
                        className="w-full pr-3 mr-3 shrink-0 md:pr-0"
                        items={defaultOption}
                        value={noPast}
                        onChange={setNoPast}
                        classButton="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                      />
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </Disclosure>
            </div>
            <div className="flex w-full">
              <button className="w-2/3 mx-auto my-5 cursor-pointer md:w-full dark:btn-stroke-dark btn-stroke-light">
                Generate Image
              </button>
            </div>
          </form>
          <div
            className="grid grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1"
            ref={imageContainerRef}
          >
            {Array.isArray(generatedImage) &&
              generatedImage.length > 0 &&
              generatedImage?.map((imagePath, index) => (
                <div
                  className="m-2 group p-2.5 border border-n-2 rounded-md transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] 2xl:p-1.5 lg:p-2.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
                  key={index}
                >
                  <div className="fill-n-4 group-hover:fill-n-7 dark:group-hover:fill-n-4">
                    <img
                      className="object-cover w-full h-full "
                      src={API_HOST + imagePath}
                      alt="art"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        {loader && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-n-7">
            <Spinner thickness="4px" speed="0.65s" size="xl" />
          </div>
        )}
      </Chat>
    </Layout>
  );
};

export default ImageGenerator;
