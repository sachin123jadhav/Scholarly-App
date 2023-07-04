import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useColorMode } from "@chakra-ui/color-mode";

import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Logo from "../../../components/Logo/Logo";

const Form = () => {
  const [forgot, setForgot] = useState(false);

  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";
  return (
    <div className="w-full max-w-[31.5rem] m-auto">
      {forgot ? (
        <ForgotPassword onClick={() => setForgot(false)} />
      ) : (
        <>
          <Logo className="max-w-[11.875rem] mx-auto mb-8" dark={isLightMode} />
          <SignIn onClick={() => setForgot(true)} />
        </>
      )}
    </div>
  );
};

export default Form;
