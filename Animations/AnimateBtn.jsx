"use client";
import { motion } from "framer-motion";

const AnimateBtn = ({ children, animate, style }) => {
  return (
    <motion.button
      className={style}
      whileHover="hover"
      whileTap="tap"
      variants={animate}
    >
      {children}
    </motion.button>
  );
};

export default AnimateBtn;
