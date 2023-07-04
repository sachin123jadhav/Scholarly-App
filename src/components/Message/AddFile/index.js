import { useState } from "react";
import Modal from "../../Modal";
import Icon from "../../Icon";

const AddFile = ({ setSelectedFile, acceptedFile }) => {
  const [visible, setVisible] = useState(false);

  const handleFileChange = (event) => {
    console.log("event.target.files", event.target.files);
    const file = event.target.files[0];
    setSelectedFile(file);
    setVisible(false);
  };

  return (
    <>
      <button
        className="absolute w-10 h-10 outline-none group left-3 bottom-2"
        onClick={() => setVisible(true)}
      >
        <Icon
          className="w-7 h-7 fill-[#7F8689] transition-colors group-hover:fill-primary-1 dark:fill-n-4"
          name="plus-circle"
        />
      </button>
      <Modal
        classWrap="max-w-[25.2rem] rounded-none bg-transparent"
        classOverlay="bg-n-7/95 dark:bg-n-7/95"
        classButtonClose="hidden"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <div className="relative p-3 bg-primary-1 rounded-[1.25rem]">
          <input
            className="absolute inset-0 opacity-0"
            accept={acceptedFile}
            type="file"
            onChange={handleFileChange}
          />
          <div className="px-6 text-center border-2 border-dashed py-14 border-n-1 rounded-xl text-n-1">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-n-1">
              <Icon name="upload" />
            </div>
            <div className="h5">Upload to Scholarly</div>
            {/* <div className="base2">You can add prompts after uploading.</div> */}
            <button className="px-4 py-2 mt-4 text-sm font-medium text-white rounded-md bg-primary-3 hover:bg-primary-4">
              Upload File
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddFile;
