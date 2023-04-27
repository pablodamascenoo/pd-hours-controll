import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="w-[182px] h-12 rounded-lg bg-base-blue hover:bg-hover-blue transition-colors duration-300 text-white font-medium"
    >
      {children}
    </button>
  );
}
