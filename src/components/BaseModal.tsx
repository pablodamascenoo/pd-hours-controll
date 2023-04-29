import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

type Props = {
  handleClose: () => void;
  children: ReactNode;
};

export default function BaseModal({ handleClose, children }: Props) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="rounded-xl bg-white w-[414px] h-fit px-8 py-16 flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}
