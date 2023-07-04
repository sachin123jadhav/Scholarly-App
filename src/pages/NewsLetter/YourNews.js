import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineReload } from "react-icons/ai";

import Layout from "../../components/Layout";
import NewsletterSection from "../../components/NewsLetter/NewsletterSection";
import Chat from "../../components/Chat";
import { getNews } from "../../store/NewsLetter";
import { ROUTES } from "../../routes/RouterConfig";

const YourNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.Auth.token);
  const news = useSelector((state) => state.NewsLetter.newsletter);

  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (news) {
      setLoader(false);
    }
  }, [news]);

  useEffect(() => {
    dispatch(getNews(token, setLoader));
  }, []);

  const handleSelectedNews = (item) => {
    navigate(ROUTES.NEWSLETTER_DETAILS, { state: { item } });
  };

  const completedNews = useMemo(() => {
    return news.filter((item) => item.status === "complete");
  }, [news]);

  const pendingNews = useMemo(() => {
    return news.filter((item) => item.status === "pending");
  }, [news]);

  const failedNews = useMemo(() => {
    return news.filter((item) => item.status === "fail");
  }, [news]);

  const handleRefreshClick = () => {
    setRefreshing(true);
    setTimeout(() => {
      // setData([]);
      dispatch(getNews(token, setLoader));
      setRefreshing(false);
    }, 300);
  };

  return (
    <Layout>
      <Chat
        title="Your NewsLetter"
        backIcon
        handleBackClick={() => navigate(ROUTES.NEWSLETTER)}
        className="xl:-mt-0 md:-mt-15 md:pb-4"
        headerRightComponent={
          <button
            onClick={handleRefreshClick}
            className="flex items-center justify-center px-4 py-2 cursor-pointer"
          >
            {refreshing ? (
              <RxCross1 className="w-5 h-5 mr-3 dark:text-white animate-pulse" />
            ) : (
              <AiOutlineReload className="w-5 h-5 mr-3 dark:text-white" />
            )}
          </button>
        }
      >
        {loader ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-n-7">
            <Spinner thickness="4px" speed="0.65s" size="xl" />
          </div>
        ) : news.length > 0 ? (
          <div className="relative px-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
            <NewsletterSection
              title="Completed NewsLetter"
              newsletters={completedNews}
              handleSelectedNews={handleSelectedNews}
              defaultOpen={true}
            />
            <NewsletterSection title="Pending NewsLetter" newsletters={pendingNews} />
            <NewsletterSection title="Failed NewsLetter" newsletters={failedNews} />
          </div>
        ) : (
          <div className="relative p-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
            {/* <div className="grid grid-cols-2 mx-6 md:grid-cols-1 gap-x-2"> */}
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 ">
              <p>No NewsLetters found</p>
            </div>
          </div>
        )}
      </Chat>
    </Layout>
  );
};

export default YourNews;
