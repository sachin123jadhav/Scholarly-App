import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import Icon from "../../Icon";
// import Modal from "@/components/Modal";
// import AddChatList from "@/components/AddChatList";

const ChatList = ({ visible, items }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <div className="pb-6 mb-auto">
        <Disclosure defaultOpen={true}>
          <Disclosure.Button
            className={`flex items-center w-full h-12 text-left base2 text-n-4/75 transition-colors hover:text-n-3 ${
              visible ? "justify-center px-3" : "px-5"
            }`}
          >
            <Icon className="transition-transform fill-n-4 ui-open:rotate-180" name="arrow-down" />
            {!visible && <div className="ml-5">Chat list</div>}
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className={`${visible && "px-2"}`}>
              {items.map((item) => (
                <Link
                  className={twMerge(
                    `flex items-center w-full h-12 rounded-lg text-n-3/75 base2 font-semibold transition-colors hover:text-n-1 ${
                      visible ? "px-3" : "px-5"
                    } ${
                      pathname === item.url &&
                      "text-n-1 bg-gradient-to-l from-[#323337] to-[rgba(80,62,110,0.29)]"
                    }`
                  )}
                  key={item.id}
                  to={item.url}
                >
                  <div className="flex items-center justify-center w-6 h-6">
                    <div
                      className="w-3.5 h-3.5 rounded"
                      style={{
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                  {!visible && (
                    <>
                      <div className="ml-5">{item.title}</div>
                      <div className="px-2 ml-auto font-semibold rounded-lg bg-n-6 base2 text-n-4">
                        {item.counter}
                      </div>
                    </>
                  )}
                </Link>
              ))}
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
        <button
          className={`group flex items-center w-full h-12 text-left base2 text-n-3/75 transition-colors hover:text-n-3 ${
            visible ? "justify-center px-3" : "px-5"
          }`}
          onClick={() => setVisibleModal(true)}
        >
          <Icon className="transition-colors fill-n-4 group-hover:fill-n-3" name="plus-circle" />
          {!visible && <div className="ml-5">New list</div>}
        </button>
      </div>
      {/* <Modal
        className="md:!p-0"
        classWrap="max-w-[40rem] md:min-h-screen-ios md:rounded-none md:pb-8"
        classButtonClose="absolute top-6 right-6 w-10 h-10 rounded-full bg-n-2 md:right-5 dark:bg-n-4/25 dark:fill-n-4 dark:hover:fill-n-1"
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      >
        <AddChatList onCancel={() => setVisibleModal(false)} />
      </Modal> */}
    </>
  );
};

export default ChatList;
