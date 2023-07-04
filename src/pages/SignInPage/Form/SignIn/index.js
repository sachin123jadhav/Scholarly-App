import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

import Field from "../../../../components/Field";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../../store/Auth";

const SignIn = ({ onClick }) => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    let params = {
      email: name,
      password: password,
    };
    dispatch(loginAction(params, setLoader));
  };

  return (
    <form action="" onSubmit={onSubmit}>
      <Field
        className="mb-4"
        classInput="dark:bg-[#e8f0fe] dark:border-bg-[#e8f0fe]"
        placeholder="Email"
        icon="email"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        isDarkModeAllowed={false}
      />
      <Field
        className="mb-2"
        classInput="dark:bg-[#e8f0fe] dark:border-bg-[#e8f0fe]"
        placeholder="Password"
        icon="lock"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        isDarkModeAllowed={false}
      />
      <button
        className="mb-6 transition-colors base2 text-primary-1 hover:text-primary-1/90"
        type="button"
        onClick={onClick}
      >
        Forgot password?
      </button>
      <button className="w-full btn-blue btn-large" type="submit">
        {loader ? <Spinner /> : "Sign in with Scholarly"}
      </button>
    </form>
  );
};

export default SignIn;
