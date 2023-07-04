import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Chat from "../../components/Chat";
import Layout from "../../components/Layout";
import Icon from "../../components/Icon";
import { clearArtDetailsAction, getArtsImagesAction } from "../../store/Arts";
import { API_HOST } from "../../utils/https";

const ArtGeneratorHistoryDetails = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [art, setArt] = useState(null);

  const token = useSelector((state) => state.Auth.token);
  const artsImages = useSelector((state) => state.Arts.artsDetails);

  useEffect(() => {
    dispatch(getArtsImagesAction(token, state.item.id));
  }, []);

  useEffect(() => {
    if (artsImages) {
      setArt(artsImages);
    }
  }, [artsImages]);

  async function download(item) {
    const a = document.createElement("a");
    a.href = await toDataURL(API_HOST + item.ai_image);
    a.download = item.ai_image;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function toDataURL(url) {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  }

  const handleBackClick = () => {
    window.history.back();
    dispatch(clearArtDetailsAction());
  };

  return (
    <Layout>
      <Chat title={state.item.prompt} backIcon handleBackClick={handleBackClick}>
        <div className="relative p-10 space-y-10 overflow-y-auto z-2 grow scroll-smooth scrollbar-none 2xl:p-6 md:p-5">
          <div
            className="grid w-full grid-cols-4 gap-4 md:grid-cols-2 border-n-3 dark:border-n-5"
            key={state.item.id}
          >
            {art &&
              art.map((item, index) => (
                <div className="m-5" key={index}>
                  <div className="mb-5 r">
                    <img
                      className="object-cover w-full h-full aspect-square rounded-xl"
                      src={API_HOST + item.ai_image}
                      alt="art"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => download(item)}
                  >
                    <Icon className=" dark:fill-n-1 fill-n-7" name="download" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Chat>
    </Layout>
  );
};

export default ArtGeneratorHistoryDetails;
