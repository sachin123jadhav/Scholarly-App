import { motion } from "framer-motion";

const FadeOut = ({ delay = 0, children, ...otherProps }) => (
  <motion.div
    exit={{ opacity: 0, x: -100 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring", delay: delay ?? 0 }}
    {...otherProps}
  >
    {children}
  </motion.div>
);

FadeOut.displayName = "FadeOut";
export default FadeOut;
