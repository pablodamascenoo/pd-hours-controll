import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function Backdrop({ onClick, children }: Props) {
  return (
    <motion.div
      className="absolute top-0 left-0 bg-black/75 h-full w-full flex justify-center items-center"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
