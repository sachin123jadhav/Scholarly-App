import { useLocation } from "react-router-dom";

import Layout from "../../components/Layout";
import Chat from "../../components/Chat";

const NewsDetails = () => {
  const { state } = useLocation();

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Layout>
      <Chat
        title={state.item.topic}
        backIcon
        handleBackClick={handleBackClick}
        className="xl:-mt-0 md:-mt-13 md:pb-5"
      >
        <div className="relative px-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:px-6 md:px-5">
          {/* <div className="mb-4 text-center h3 md:pr-16 md:h4">{state.item.topic}</div> */}
          <div
            className="flex w-full px-5 pt-5 pb-16 border-n-3 lg:block md:py-8 dark:border-n-5"
            key={state.item.id}
          >
            <div className="w-full shrink-0 lg:w-full lg:mb-10 lg:pr-0">
              <div className="mb-5 h6" dangerouslySetInnerHTML={{ __html: state.item.news }} />
            </div>
          </div>
        </div>
      </Chat>
    </Layout>
  );
};

export default NewsDetails;
