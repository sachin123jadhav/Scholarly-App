import React, { memo } from "react";
import { pdf } from "@react-pdf/renderer";
import { FaFilePdf } from "react-icons/fa";

import WindowButton from "../WindowButton";
import { MESSAGE_TYPE_GOAL, MESSAGE_TYPE_TASK } from "../../../Constants/agentTypes";

const PDFButton = ({ messages, name, taskName }) => {
  const textSections = getTextSections(messages);

  const downloadPDF = async () => {
    const MyDocument = (await import("./MyDocument.js")).default;

    const blob = await pdf(<MyDocument textSections={textSections} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // link.download = "my-document.pdf";
    link.download = taskName ? `${taskName}.pdf` : "Researcher.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <WindowButton
        onClick={() => {
          downloadPDF().catch(console.error);
        }}
        icon={<FaFilePdf size={12} />}
        name={name}
      />
    </>
  );
};

const getTextSections = (messages) => {
  // Note "Thinking" messages have no `value` so they show up as new lines
  return messages
    .map((message) => {
      if (message.type === MESSAGE_TYPE_GOAL) {
        return `Goal ${message.value}`;
      }
      if (message.type === MESSAGE_TYPE_TASK) {
        if (message.info) {
          return `Executing "${message.value}": ${message.info}`;
        } else {
          return `Adding Task: ${message.value}`;
        }
      }
      return message.value;
    })
    .filter((message) => message !== "");
};

export default memo(PDFButton);
