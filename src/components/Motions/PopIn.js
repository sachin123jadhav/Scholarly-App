import { motion } from "framer-motion";

const PopIn = ({ delay = 0, children, ...otherProps }) => (
  <motion.div
    exit={{ scale: 0 }}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring", delay: delay }}
    {...otherProps}
  >
    {children}
  </motion.div>
);

PopIn.displayName = "PopIn";
export default PopIn;
