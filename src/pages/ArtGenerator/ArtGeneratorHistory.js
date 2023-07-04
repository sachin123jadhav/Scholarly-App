import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import Layout from "../../components/Layout";
import Icon from "../../components/Icon";
import { ROUTES } from "../../routes/RouterConfig";
import { getArts } from "../../store/Arts";
import Chat from "../../components/Chat";

const ArtGeneratorHistory = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector((state) => state.Auth.token);
  const arts = useSelector((state) => state.Arts.arts);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (arts) {
      setLoader(false);
    }
  }, [arts]);

  useEffect(() => {
    dispatch(getArts(token));
  }, []);

  const handleSelectedNews = (item) => {
    navigate(ROUTES.ART_GENERATOR_HISTORY_DETAILS, { state: { item } });
  };

  function groupByDate([...artArray]) {
    return artArray.reduce((groupedData, item) => {
      const { Created_At } = item;
      const date = new Date(Created_At);

      if (isNaN(date)) {
        // handle invalid date here
        // skip the item or assign it to a default date
        return groupedData;
      }

      const dateString = date.toDateString();

      if (!groupedData.hasOwnProperty(dateString)) {
        groupedData[dateString] = [];
      }

      groupedData[dateString].push(item);
      return groupedData;
    }, {});
  }

  const groupedData = groupByDate(arts);

  return (
    <Layout>
      <Chat
        title="Art Generator History"
        backIcon
        handleBackClick={() => navigate(ROUTES.ART_GENERATOR)}
        className="xl:-mt-0 md:-mt-14 md:pb-5"
      >
        {loader ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-n-7">
            <Spinner thickness="4px" speed="0.65s" size="xl" />
          </div>
        ) : arts.length > 0 ? (
          <div className="relative z-10 grid gap-4 p-4 mb-8 overflow-y-auto md:block grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
            {Object.entries(groupedData).map(([date, artsByDate]) => (
              <div key={date}>
                <h3 className="py-4">{date}</h3>
                <div className="grid grid-cols-2 mx-6 md:grid-cols-1 gap-x-2">
                  {artsByDate.map((art) => (
                    <div className="group flex items-center justify-between mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7">
                      <p className="w-9/12 text-base font-semibold truncate md:text-sm">
                        {art.prompt}
                      </p>
                      <div className="flex gap-4">
                        <div className="flex">
                          <Icon
                            className="ml-auto transition-colors cursor-pointer fill-n-4 group-hover:fill-red-600 "
                            name="trash"
                          />
                        </div>
                        <div className="flex" onClick={() => handleSelectedNews(art)}>
                          <Icon
                            className="ml-auto transition-colors cursor-pointer fill-n-4 group-hover:fill-n-7 dark:group-hover:fill-n-3"
                            name="arrow-next"
                          />
                        </div>
                      </div>
                    </div>
                    // <div></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative p-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 ">
              <p>No Arts found</p>
            </div>
          </div>
        )}
      </Chat>
    </Layout>
  );
};

export default ArtGeneratorHistory;
