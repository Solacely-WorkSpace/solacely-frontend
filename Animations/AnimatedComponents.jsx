"use client";
import { motion } from "framer-motion";

const AnimatedComponents = ({ children, animationVariants }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponents;
