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
const Button = ({
  variant,
  color,
  children,
  onClick,
  className = "",
}: ButtonProps) => {
  const variantClassses = {
    solid: clsx("text-white", "border-2 border-" + color, "bg-" + color),
    outline: clsx("text-" + color, "border-2 border-" + color, ""),
  };
  const typeClasses = {
    primary: variantClassses[variant],
    secondary: variantClassses[variant],
  };

  return (
    <button
      className={clsx(
        ` ${typeClasses[color]} px-5 py-1.5  font-semibold  w-full rounded ${className}`
      )}
      onClick={onClick}
    >
      {/* {colors[color]} */}
      {children}
      <span
        className={clsx(
          "hidden border-primary text-primary bg-secondary bg-primary text-secondary"
        )}
      ></span>
    </button>
  );
};
export default Button;
