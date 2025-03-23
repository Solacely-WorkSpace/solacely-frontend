"use client";
import { motion } from "framer-motion";

const AnimateNav = ({ children, animation }) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={animation}>
      {children}
    </motion.div>
  );
};

export default AnimateNav;
