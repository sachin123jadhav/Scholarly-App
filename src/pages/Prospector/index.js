import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import Chat from "../../components/Chat";
import Icon from "../../components/Icon";
import Layout from "../../components/Layout";
import { getScrapData, selectScrapData } from "../../store/Prospector";
import { ROUTES } from "../../routes/RouterConfig";

const Prospector = () => {
  const token = useSelector((state) => state.Auth.token);
  const scrapData = useSelector(selectScrapData);

  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getScrapData(token, setLoader));
  }, [dispatch, token]);

  const handleClick = ({ datasetid, name }) => {
    navigate(ROUTES.PROSPECTOR_DATA_TABLE, {
      state: { datasetid, name },
    });
  };

  const groupByDate = ([...dataArray]) => {
    return dataArray.reduce((groupedData, item) => {
      const { created_at } = item;
      const date = new Date(created_at);

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
  };

  const groupedData = groupByDate(scrapData);

  if (loader) {
    return (
      <Layout>
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-n-7">
          <Spinner thickness="4px" speed="0.65s" size="xl" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Chat title="Prospector">
        <div className="relative z-10 grid gap-4 p-4 mb-8 overflow-y-auto md:block grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
          {Object.entries(groupedData).map(([date, artsByDate]) => (
            <div key={date}>
              <h3 className="py-4">{date}</h3>
              <div className="grid grid-cols-2 mx-6 md:grid-cols-1 gap-x-2">
                {Array.isArray(artsByDate) &&
                  artsByDate?.map((item) => {
                    const { map_id, name, datasetid, created_at } = item;
                    const date = new Date(created_at);
                    return (
                      <div
                        className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)]  2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
                        key={map_id}
                        onClick={() => handleClick({ datasetid, name })}
                      >
                        <p className="w-9/12 text-base font-semibold truncate md:text-sm">
                          {name ||
                            `Test ${date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}`}
                        </p>
                        <Icon
                          className="ml-auto transition-colors fill-n-4 group-hover:fill-n-7 dark:group-hover:fill-n-4"
                          name="arrow-next"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </Chat>
    </Layout>
  );
};

export default Prospector;
