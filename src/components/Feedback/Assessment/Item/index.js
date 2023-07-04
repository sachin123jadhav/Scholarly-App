import { useState } from "react";

import Icon from "../../../Icon";
import Modal from "../../../Modal";

const Item = ({ item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="table-row base2 md:flex md:items-center">
        <div className="table-cell py-3 pl-5 align-middle border-t border-n-3 md:hidden dark:border-n-5/50">
          {item.number}
        </div>
        <div className="table-cell py-3 pl-5 align-middle border-t border-n-3 text-accent-1 md:shrink-0 md:w-1/2 md:pr-2 dark:border-n-5/50">
          {item.incorrect}
        </div>
        <div className="table-cell align-middle py-3 pl-5 border-t border-n-3 text-[#56A171] md:shrink-0 md:w-1/2 md:pl-0 md:pr-5 dark:border-n-5/50">
          <div className="inline-flex items-center md:flex">
            <Icon className="shrink-0 w-5 h-5 mr-2 fill-[#56A171]" name="check-circle" />
            <div className="md:w-[calc(100%-1.25rem)] md:truncate">{item.correct}</div>
          </div>
        </div>
        <div className="table-cell py-3 pl-5 pr-5 text-center align-middle border-t border-n-3 text-0 md:hidden dark:border-n-5/50">
          <button className="group" onClick={() => setVisible(true)}>
            <Icon
              className="transition-colors fill-n-4/75 group-hover:fill-primary-1"
              name="play-circle"
            />
          </button>
        </div>
      </div>
      <Modal visible={visible} onClose={() => setVisible(false)} video>
        <iframe
          style={{
            width: "100%",
            height: "100%",
          }}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/4cR7E79X8Ys"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </Modal>
    </>
  );
};

export default Item;
