import { useState } from "react";
import { useDispatch } from "react-redux";

import Field from "../../../../components/Field";
import Icon from "../../../../components/Icon";
import { forgotPasswordAction } from "../../../../store/Auth";

const ForgotPassword = ({ onClick }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let params = {
      email: email,
    };
    dispatch(forgotPasswordAction(params));
  };

  return (
    <>
      <button className="flex items-center mb-8 group h5" onClick={onClick}>
        <Icon
          className="mr-4 transition-transform group-hover:-translate-x-1 dark:fill-n-1"
          name="arrow-prev"
        />
        Reset your password
      </button>
      <form action="" onSubmit={onSubmit}>
        <Field
          className="mb-6"
          classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
          placeholder="Email"
          icon="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          isDarkModeAllowed={false}
        />
        <button className="w-full mb-6 btn-blue btn-large" type="submit">
          Reset password
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;
