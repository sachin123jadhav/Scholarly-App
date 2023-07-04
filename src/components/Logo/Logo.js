// import Image from "@/components/Image";
import { Link } from "react-router-dom";

const Test = ({ className, dark }) => (
  <Link className={`flex w-[11.88rem] ${className}`} to="/">
    <img
      className="w-full h-auto"
      src={require("../../assets/Images/logo.png")}
      width={190}
      height={40}
      alt="Brainwave"
    />
  </Link>
);

export default Test;
