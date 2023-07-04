import Loading from "./Loading";

const Answer = ({ children, loading, time }) => {
  return (
    <div className="max-w-[50rem]">
      <div className="px-6 pt-6 pb-10 space-y-4 bg-n-2 rounded-[1.25rem] md:p-5 md:pb-10 dark:bg-n-7">
        {loading ? <Loading /> : children}
      </div>
      <div className="flex items-end pl-6 -mt-6">
        <div
          className={`relative shrink-0 w-12 h-12 mr-auto rounded-2xl overflow-hidden ${
            !loading && "shadow-[0_0_0_0.25rem_#FEFEFE] dark:shadow-[0_0_0_0.25rem_#232627]"
          }`}
        >
          <img
            className="object-cover rounded-2xl"
            src={require("../../assets/Images/logoIcon.png")}
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Answer;
