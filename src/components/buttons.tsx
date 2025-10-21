//MAKE buttons Component with variant outline and solid using tailwindcss and type primary and secondary colors
import React from "react";
import colors from "../app/constants/colors";
import clsx from "clsx";
interface ButtonProps {
  variant: "solid" | "outline";
  color: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
const Button = ({ variant, color, children, onClick, className = "" }: ButtonProps) => {
  const typz
  const baseClasses =
    "rounded-full transition-colors flex items-center justify-center font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]";
    
  let variantClasses = "";
  if (variant === "solid") {
    variantClasses = `bg-[${colors[color]}] text-white hover:opacity-90`;
  } else if (variant === "outline") {
    variantClasses = `border border-[${colors[color]}] text-[${colors[color]}] hover:bg-[${colors[color]}] hover:text-white`;
  }
  return (
    <button className={clsx( "",  `${baseClasses} ${variantClasses} ${className}`)} onClick={onClick}>
      {colors[color]}
      {children}
    </button>
  );
};
export default Button;
