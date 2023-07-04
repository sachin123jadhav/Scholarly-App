import React from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../components/Icon";
import Layout from "../../components/Layout";
import { ROUTES } from "../../routes/RouterConfig";

const cardList = [
  {
    id: 1,
    title: "Art Generator",
    route: ROUTES.IMAGE_GENERATOR,
  },
  {
    id: 2,
    title: "History",
    route: ROUTES.ART_GENERATOR_HISTORY,
  },
];

const ArtGenerator = () => {
  const navigate = useNavigate();

  const handleClick = (url) => navigate(url);

  return (
    <Layout>
      <div className="relative p-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
        <div className="mt-5 "></div>
        <div className="grid grid-cols-2 mx-6 md:grid-cols-1 gap-x-2">
          {cardList?.map((item) => {
            const { id, title, route } = item;
            return (
              <div
                className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)]  2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
                key={id}
                onClick={() => handleClick(route)}
              >
                <p className="w-9/12 text-base font-semibold truncate md:text-sm">{title}</p>
                <Icon
                  className="ml-auto transition-colors fill-n-4 group-hover:fill-n-7 dark:group-hover:fill-n-4"
                  name="arrow-next"
                />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ArtGenerator;
