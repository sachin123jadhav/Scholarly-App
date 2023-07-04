import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";

import Notify from "../../Notify";
import ModalShareChat from "../../ModalShareChat";

const Actions = () => {
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState(false);
  const [archive, setArchive] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const onCopy = () => {
    setCopied(true);
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 h6">Content copied</div>
      </Notify>
    ));
  };

  const handleClick = () => {
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 mr-6 h6">1 chat archived</div>
        <button className="ml-3 btn-blue btn-medium" onClick={() => toast.dismiss(t.id)}>
          Undo
        </button>
      </Notify>
    ));
  };

  const styleButton =
    "h-6 ml-3 px-2 bg-n-3 rounded-md caption1 txt-n-6 transition-colors hover:text-primary-1 dark:bg-n-7";

  return (
    <>
      <CopyToClipboard text="Content" onCopy={onCopy}>
        <button className={`${styleButton} md:hidden`}>Copy</button>
      </CopyToClipboard>
      <button className={styleButton}>Regenerate response</button>
      {!share && !archive && (
        <div className="flex px-1 ml-3 space-x-1 rounded-md bg-n-3 md:hidden dark:bg-n-7">
          <button className="" onClick={() => setShare(true)}>
            <img
              src={require("../../../assets/Images/smile-heart-eyes.png")}
              width={24}
              height={24}
              alt="Smile heart eyes"
            />
          </button>
          <button className="" onClick={() => setArchive(true)}>
            <img
              src={require("../../../assets/Images/smile-unamused.png")}
              width={24}
              height={24}
              alt="Smile unamused"
            />
          </button>
        </div>
      )}
      {share && (
        <button
          className={`flex items-center ${styleButton} pl-1 md:hidden`}
          onClick={() => setVisibleModal(true)}
        >
          <img
            src={require("../../../assets/Images/smile-heart-eyes.png")}
            width={24}
            height={24}
            alt="Smile heart eyes"
          />
          Share
        </button>
      )}
      {archive && (
        <button className={`flex items-center ${styleButton} pl-1 md:hidden`} onClick={handleClick}>
          <img src="/images/smile-unamused.png" width={24} height={24} alt="Smile unamused" />
          Archive chat
        </button>
      )}
      <ModalShareChat visible={visibleModal} onClose={() => setVisibleModal(false)} />
    </>
  );
};

export default Actions;
