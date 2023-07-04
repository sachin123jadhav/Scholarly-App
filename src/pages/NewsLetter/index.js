import React from "react";
import Layout from "../../components/Layout";
import Icon from "../../components/Icon";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";

const NewsLetter = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative p-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
        <div className="grid grid-cols-2 mx-6 md:grid-cols-1 gap-x-2">
          <div
            className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
            onClick={() => navigate(ROUTES.NEWSLETTER_CREATE)}
          >
            <p className="w-9/12 text-base font-semibold truncate md:text-sm">
              Create a newsletter
            </p>
            <Icon
              className="ml-auto transition-colors fill-n-4 group-hover:fill-n-7 dark:group-hover:fill-n-4"
              name="arrow-next"
            />
          </div>
          <div
            className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
            onClick={() => navigate(ROUTES.NEWSLETTER_HISTORY)}
          >
            <p className="w-9/12 text-base font-semibold truncate md:text-sm">
              Your Newsletters
            </p>
            <Icon
              className="ml-auto transition-colors fill-n-4 group-hover:fill-n-7 dark:group-hover:fill-n-4"
              name="arrow-next"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsLetter;
