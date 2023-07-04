import Icon from "../../Icon";

const Document = ({ value }) => (
  <div className="w-40">
    <div className="relative flex items-end h-[11.25rem] rounded-xl bg-n-2 dark:bg-n-5">
      <button className="absolute w-8 h-8 rounded-full group top-4 right-4 bg-n-1 text-0 dark:bg-n-7">
        <Icon
          className="w-4 h-4 transition-colors fill-n-4 group-hover:fill-primary-1"
          name="zoom-in"
        />
      </button>
      <div className="w-full p-6">
        <div className="w-[3.75rem] h-2 mb-3 rounded-full bg-n-3 dark:bg-n-4/25"></div>
        <div className="h-2 mb-3 rounded-full bg-n-3 dark:bg-n-4/25"></div>
        <div className="h-2 rounded-full bg-n-3 dark:bg-n-4/25"></div>
      </div>
    </div>
    <div className="mt-3 truncate base1">{value}</div>
  </div>
);

export default Document;
