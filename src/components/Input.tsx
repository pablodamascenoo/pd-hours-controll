import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  id: string;
}

export default function Input({ title, id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={id} className="font-medium text-xs text-gray-3">
        {title}
      </label>
      <input
        type="text"
        id={id}
        {...rest}
        className="pl-6 placeholder:text-gray-3  w-full rounded-lg border-[1px] border-gray-2 focus:outline-none h-[56px]"
      />
    </div>
  );
}
