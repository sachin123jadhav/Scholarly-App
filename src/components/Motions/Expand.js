import { motion } from "framer-motion";

const Expand = ({ className, delay = 0, type = "spring", children, ...otherProps }) => (
  // type should be "spring" or "tween"
  <motion.div
    initial={{ scaleX: 0.8, scaleY: 0 }}
    animate={{ scaleX: 1, scaleY: 1 }}
    transition={{
      duration: 0.75,
      type: type,
      delay: delay,
    }}
    className={className}
    {...otherProps}
  >
    {children}
  </motion.div>
);

Expand.displayName = "Expand";
export default Expand;
