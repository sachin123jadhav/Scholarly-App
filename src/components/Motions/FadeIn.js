import { motion } from "framer-motion";

const FadeIn = ({ delay = 0.3, children, ...otherProps }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, type: "spring", delay: delay }}
    {...otherProps}
  >
    {children}
  </motion.div>
);

FadeIn.displayName = "FadeIn";
export default FadeIn;
