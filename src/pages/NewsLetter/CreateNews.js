import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chat from "../../components/Chat";

import Layout from "../../components/Layout";
import Message from "../../components/Message";
import { createNews } from "../../store/NewsLetter";

const CreateNews = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);

  const [serverQuestion, setServerQuestion] = useState("");
  const [textVisible, setTextVisible] = useState(false);

  const sendNews = () => {
    dispatch(createNews(token, serverQuestion, setTextVisible));
    setServerQuestion("");
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Layout>
      <Chat title="News Letter" backIcon handleBackClick={handleBackClick}>
        <div className="mt-5">
          <Message
            value={serverQuestion}
            onChange={(e) => setServerQuestion(e.target.value)}
            onClick={sendNews}
          />
          {textVisible && (
            <div className="flex justify-center mt-5">
              <p className="text-base font-semibold text-n-7 dark:text-n-2">
                You will receive a email when your newsletter is ready.
              </p>
            </div>
          )}
        </div>
      </Chat>
    </Layout>
  );
};

export default CreateNews;
