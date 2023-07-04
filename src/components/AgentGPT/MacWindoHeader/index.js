import React from "react";
import * as htmlToImage from "html-to-image";
import { CgExport } from "react-icons/cg";
import { FaClipboard, FaImage } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineReload } from "react-icons/ai";

import PopIn from "../../Motions/PopIn";
import Expand from "../../Motions/Expand";
import Menu from "../Menu";
import WindowButton from "../WindowButton";
import PDFButton from "../PDFButton";

export const messageListId = "chat-window-message-list";

export const MacWindowHeader = ({
  title = "",
  messages,
  onSave = () => {},
  taskName,
  refreshing,
  handleRefreshClick,
}) => {
  const saveElementAsImage = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }
    htmlToImage
      .toJpeg(element, {
        height: element.scrollHeight,
        style: {
          overflowY: "visible",
          maxHeight: "none",
          border: "none",
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "agent-gpt-output.png";
        link.click();
      })
      .catch(() =>
        alert("Error saving image! Note this doesn't work if the AI generated an image")
      );
  };

  const copyElementText = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    const text = element.innerText;

    if (navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    } else {
      // Fallback to a different method for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        console.log("Text copied to clipboard");
      } catch (err) {
        console.error("Unable to copy text to clipboard", err);
      }

      document.body.removeChild(textArea);
    }
  };

  const exportOptions = [
    <WindowButton
      key="Image"
      onClick={() => saveElementAsImage(messageListId)}
      icon={<FaImage size={12} />}
      name="Image"
    />,
    <WindowButton
      key="Copy"
      onClick={() => copyElementText(messageListId)}
      icon={<FaClipboard size={12} />}
      name="Copy"
    />,
    <PDFButton key="PDF" name="PDF" messages={messages} taskName={taskName} />,
  ];

  return (
    <div className="flex items-center gap-1 p-3 overflow-visible rounded-t-3xl">
      <PopIn delay={0.4}>
        <div className="w-3 h-3 bg-red-500 rounded-full" />
      </PopIn>
      <PopIn delay={0.5}>
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
      </PopIn>
      <PopIn delay={0.6}>
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </PopIn>
      <Expand
        delay={1}
        className="flex flex-grow invisible text-sm font-bold text-gray-500 sm:ml-2 md:visible"
      >
        {title}
      </Expand>

      <Menu icon={<CgExport size={15} />} items={exportOptions} />
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
    </div>
  );
};
