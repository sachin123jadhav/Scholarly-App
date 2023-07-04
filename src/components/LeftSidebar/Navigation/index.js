import { twMerge } from "tailwind-merge";
import { useLocation, Link } from "react-router-dom";

import Icon from "../../Icon";

const Navigation = ({ visible, items }) => {
  const { pathname } = useLocation();

  const checkIsPathIncludes = (url) => {
    const pathSegments = pathname.split("/");
    const urlSegments = url.split("/");
    // Check if the number of path segments is at least 2
    if (pathSegments.length < 2 || urlSegments.length < 2) {
      return false;
    }
    // Extract the first segment of the path from the `pathname` and `url` variables
    const [path, path2] = [pathSegments[1], urlSegments[1]];
    return path === path2;
  };

  return (
    <div className={`${visible && "px-2"}`}>
      {items.map((item, index) =>
        item.url ? (
          <Link
            className={twMerge(
              `flex items-center h-12 base2 font-semibold text-n-3/75  rounded-lg transition-colors hover:text-n-1 ${
                (pathname === item.url || checkIsPathIncludes(item.url)) &&
                "text-n-1 bg-gradient-to-l from-[#323337] to-[rgba(70,79,111,0.3)] shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)]"
              } ${visible ? "px-3" : "px-5"}`
            )}
            // href={item.url}
            to={item.url}
            key={index}
          >
            <Icon className={item.color} name={item.icon} />
            {!visible && <div className="ml-5">{item.title}</div>}
          </Link>
        ) : (
          <button
            className={`flex items-center w-full h-12 base2 font-semibold text-n-3/75 rounded-lg transition-colors hover:text-n-1 ${
              visible ? "px-3" : "px-5"
            }`}
            key={index}
            onClick={item.onClick}
          >
            <Icon className={item.color} name={item.icon} />
            {!visible && <div className="ml-5">{item.title}</div>}
            {item.title === "Search" && !visible && (
              <div className="px-2 ml-auto font-semibold rounded-md bg-n-4/50 caption1 text-n-3">
                ⌘ F
              </div>
            )}
          </button>
        )
      )}
    </div>
  );
};

export default Navigation;
