import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "react-responsive";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import { Link } from "react-router-dom";

import LeftSidebar from "../LeftSidebar";
import Burger from "./Burger";
import Icon from "../Icon";

const Layout = ({
  smallSidebar,
  hideRightSidebar,
  backUrl,
  children,
  headerStyle = "md:pt-10 lg:pt-0",
}) => {
  const [visibleSidebar, setVisibleSidebar] = useState(smallSidebar || false);
  const [visibleRightSidebar, setVisibleRightSidebar] = useState(false);

  const isDesktop = useMediaQuery({
    query: "(max-width: 1179px)",
  });

  const handleClickOverlay = () => {
    setVisibleSidebar(true);
    setVisibleRightSidebar(false);
    clearQueueScrollLocks();
    enablePageScroll();
  };

  useEffect(() => {
    setVisibleSidebar(smallSidebar || isDesktop);
  }, [isDesktop, smallSidebar]);

  return (
    <>
      <div
        className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 dark:md:bg-n-6 md:overflow-hidden ${
          visibleSidebar
            ? "pl-24 md:pl-0"
            : smallSidebar
            ? "pl-24 md:pl-0"
            : "pl-80 xl:pl-24 md:pl-0"
        }`}
      >
        <LeftSidebar
          value={visibleSidebar}
          setValue={setVisibleSidebar}
          visibleRightSidebar={visibleRightSidebar}
          smallSidebar={smallSidebar}
        />
        <div
          className={`flex py-5 md:py-0 ${
            hideRightSidebar ? "min-h-screen min-h-screen-ios" : "h-screen h-screen-ios"
          }`}
        >
          <div className="relative flex grow max-w-full bg-n-1 rounded-[1.25rem] md:rounded-none dark:bg-n-6">
            <div
              className={`relative flex flex-col grow max-w-full ${
                !hideRightSidebar && headerStyle
              }`}
            >
              {!hideRightSidebar && (
                <Burger
                  className={`${!visibleSidebar && "md:hidden"}`}
                  visibleRightSidebar={visibleRightSidebar}
                  onClick={() => setVisibleRightSidebar(!visibleRightSidebar)}
                />
              )}
              {children}
            </div>
          </div>
        </div>
        <div
          className={twMerge(
            `fixed inset-0 z-10 bg-n-7/80 invisible opacity-0 md:hidden ${
              (!visibleSidebar && smallSidebar) || (visibleRightSidebar && "visible opacity-100")
            }`
          )}
          onClick={handleClickOverlay}
        ></div>
      </div>
    </>
  );
};

export default Layout;
