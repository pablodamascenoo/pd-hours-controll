import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function Button({ children, style, ...rest }: ButtonProps) {
  return (
    <button
      style={style}
      {...rest}
      className="w-[182px] h-12 rounded-lg bg-base-blue hover:bg-hover-blue transition-colors duration-300 text-white font-medium"
    >
      {children}
    </button>
  );
}
