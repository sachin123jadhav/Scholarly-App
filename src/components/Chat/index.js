import { useState } from "react";
import Icon from "../Icon";

import ModalShareChat from "../ModalShareChat";

const Chat = ({
  title,
  children,
  backIcon = false,
  handleBackClick = () => {},
  className = "xl:-mt-0 md:-mt-18 md:pb-3",
  headerRightComponent = null,
}) => {
  const [favorite, setFavorite] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      <div
        className={`flex items-center min-h-[4.5rem] px-10 py-3 md:pb-3 md:pt-12 border-b border-n-3 shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.06)] 2xl:px-6 lg:pr-20 md:pl-5 md:pr-18 dark:border-n-5 dark:shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.15)] ${className}`}
      >
        {backIcon && (
          <div onClick={handleBackClick}>
            <Icon name="arrow-prev" className="mr-5 cursor-pointer dark:fill-n-3" />
          </div>
        )}
        <div className="mr-auto truncate h5 md:h6">{title}</div>
        {headerRightComponent}
      </div>
      <div className="relative p-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
        {children}
      </div>
      <ModalShareChat visible={visibleModal} onClose={() => setVisibleModal(false)} />
    </>
  );
};

export default Chat;
