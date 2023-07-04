import { Ring } from "@uiball/loaders";

const Loader = ({ className, size = 16, speed = 2, lineWeight = 7 }) => {
  return (
    <div className={className}>
      <Ring size={size} speed={speed} color="white" lineWeight={lineWeight} />
    </div>
  );
};

export default Loader;
