import React from "react";
import Error from "@/../public/Error.svg";
import X from "@/../public/x.svg";
import Image from "next/image";

type Props = {
  text: string;
  handleClose: () => void;
};

export default function ErrorCard({ text, handleClose }: Props) {
  return (
    <div className="w-[358px] h-[48px] rounded-lg mb-[64px] bg-error/10 flex items-center justify-between px-5">
      <div className="flex justify-center items-center gap-4 text-error">
        <Image src={Error} alt="erro" />
        <p>{text}</p>
      </div>
      <Image
        src={X}
        alt="fechar"
        onClick={handleClose}
        className="hover:cursor-pointer"
      />
    </div>
  );
}
