import React, { InputHTMLAttributes } from "react";
import Error from "@/../public/Error.svg";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  id: string;
  error: string;
}

export default function Input({ title, id, error, ...rest }: InputProps) {
  return (
    <div className="flex flex-col w-full gap-2 relative">
      <label htmlFor={id} className="font-medium text-xs text-gray-3">
        {title.toUpperCase()}
      </label>
      <input
        type="text"
        id={id}
        {...rest}
        className="pl-6 placeholder:text-gray-2  w-full rounded-lg border-[1px] border-gray-2 focus:outline-none h-[56px]"
        style={{ borderColor: error === id ? "#F03D3E" : "" }}
      />
      <Image
        src={Error}
        alt="erro"
        className="absolute bottom-4 right-4"
        style={{ display: error !== id ? "none" : "" }}
      />
    </div>
  );
}
