import { useSelector } from "react-redux";
import Document from "./Document";
import { API_HOST } from "../../utils/https";

const Question = ({ content, image, document, time }) => {
  const profile = useSelector((state) => state.Auth.profile);

  return (
    <div className="max-w-[50rem] ml-auto">
      <div className="space-y-6 px-6 pt-6 pb-10 border-3 border-n-2 rounded-[1.25rem] md:p-5 md:pb-10 dark:border-transparent dark:bg-n-5/50">
        {document && <Document value={document} />}
        <div className="">{content}</div>
        {image && (
          <div className="relative w-[11.25rem] h-[11.25rem]">
            <img className="object-cover rounded-xl" src={image} alt="Avatar" />
          </div>
        )}
      </div>
      <div className="flex items-end pr-6 -mt-6">
        <div className="caption1 text-n-4/50 dark:text-n-4">{time}</div>
        {/* <button className="ml-3 px-2 py-0.5 bg-n-3 rounded-md caption1 txt-n-6 transition-colors hover:text-primary-1 dark:bg-n-5/50">
                Edit
            </button> */}
        <div className="relative w-12 h-12 ml-auto rounded-2xl overflow-hidden shadow-[0_0_0_0.25rem_#FEFEFE] dark:shadow-[0_0_0_0.25rem_#232627]">
          <img
            className="object-cover"
            src={
              profile
                ? profile.User_Profile_image
                  ? API_HOST + profile.User_Profile_image
                  : require("../../assets/Images/avatar.jpg")
                : require("../../assets/Images/avatar.jpg")
            }
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
