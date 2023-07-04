import { useState, useEffect } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

import Icon from "../Icon";
import Navigation from "./Navigation";
// import ChatList from "./ChatList";
import ToggleTheme from "./ToggleTheme";
import Modal from "../Modal";
import Profile from "./Profile";
import Settings from "../Settings";
import { ROUTES } from "../../routes/RouterConfig";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/Auth";
// import { chatList } from "../../mocks/chatList";
// import { settings } from "@/constants/settings";

const LeftSidebar = ({ value, setValue, smallSidebar, visibleRightSidebar }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.Auth.token);

  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleSettings, setVisibleSettings] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", handleWindowKeyDown);
    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, []);

  const handleWindowKeyDown = (event) => {
    if (event.metaKey && event.key === "f") {
      event.preventDefault();
      setVisibleSearch(true);
    }
  };

  const logout = () => {
    dispatch(logoutAction(token));
  };

  const navigation = [
    {
      title: "Writer",
      icon: "edit",
      color: "fill-accent-2",
      url: ROUTES.WRITER,
    },
    {
      title: "Chatbot",
      icon: "chat",
      color: "fill-accent-3",
      url: ROUTES.CHATTING,
    },
    {
      title: "Researcher",
      icon: "dataflow",
      color: "fill-accent-4",
      url: ROUTES.AGENT_GPT,
    },
    {
      title: "Q&A",
      icon: "chat-1",
      color: "fill-accent-7",
      url: ROUTES.QNA,
    },
    {
      title: "Data Analyst",
      icon: "card",
      color: "fill-accent-3",
      url: ROUTES.DATA_ANALYST,
    },
    {
      title: "Artist",
      icon: "image-check",
      color: "fill-accent-6",
      url: ROUTES.ART_GENERATOR,
    },
    {
      title: "News Reporter",
      icon: "barcode",
      color: "fill-accent-5",
      url: ROUTES.NEWSLETTER,
    },
    {
      title: "Prospector",
      icon: "codepen",
      color: "fill-accent-7",
      url: ROUTES.PROSPECTOR,
    },
    {
      title: "Settings",
      icon: "settings",
      color: "fill-accent-1",
      // onClick: () => setVisibleSettings(true),
    },
    {
      title: "Logout",
      icon: "logout",
      color: "fill-accent-6",
      onClick: logout,
    },
  ];

  const handleClick = () => {
    setValue(!value);
    smallSidebar && value ? disablePageScroll() : enablePageScroll();
  };

  return (
    <>
      <div
        className={twMerge(
          `fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-28 px-4 bg-n-7 md:invisible md:opacity-0 md:transition-opacity ${
            value ? "w-24 pb-38 md:w-16 md:px-0 md:pb-30" : "w-80 pb-40"
          } ${visibleRightSidebar && "md:visible md:opacity-100"}`
        )}
      >
        <div
          className={`absolute -top-5 right-0 left-0 flex items-center h-40 pl-7 pr-6 ${
            value ? "justify-center md:px-4" : "justify-between"
          }`}
        >
          {!value && (
            <Link className="flex w-[5rem] mx-auto" to="/">
              <img
                className="object-contain w-full h-auto"
                src={require("../../assets/Images/logoIcon.png")}
                alt="Scholarly"
              />
            </Link>
          )}
          <button className="group tap-highlight-color" onClick={handleClick}>
            <Icon
              className="transition-colors fill-n-4 group-hover:fill-n-3"
              name={value ? "toggle-on" : "toggle-off"}
            />
          </button>
        </div>
        <div className="mt-2 overflow-y-auto grow scroll-smooth scrollbar-none">
          <Navigation visible={value} items={navigation} />
          <div className={`my-4 h-0.25 bg-n-6 ${value ? "-mx-4 md:mx-0" : "-mx-2 md:mx-0"}`}></div>
          {/* <ChatList visible={value} items={chatList} /> */}
        </div>
        <div className="absolute left-0 bottom-0 right-0 pb-6 px-4 bg-n-7 before:absolute before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)] before:pointer-events-none md:px-3">
          <Profile visible={value} />
          <ToggleTheme visible={value} />
        </div>
      </div>
      {/* <Modal
        className="md:!p-0"
        classWrap="md:min-h-screen-ios md:rounded-none dark:shadow-[inset_0_0_0_0.0625rem_#232627,0_2rem_4rem_-1rem_rgba(0,0,0,0.33)] dark:md:shadow-none"
        classButtonClose="hidden md:flex md:absolute md:top-6 md:left-6 dark:fill-n-1"
        classOverlay="md:bg-n-1"
        visible={visibleSearch}
        onClose={() => setVisibleSearch(false)}
      >
        <Search items={resultSearch} />
      </Modal> */}
      <Modal
        className="md:!p-0"
        classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
        classButtonClose="hidden md:block md:absolute md:top-5 md:right-5 dark:fill-n-4"
        classOverlay="md:bg-n-1"
        visible={visibleSettings}
        onClose={() => setVisibleSettings(false)}
      >
        <Settings />
      </Modal>
    </>
  );
};

export default LeftSidebar;
