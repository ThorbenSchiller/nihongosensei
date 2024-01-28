import React, { forwardRef } from "react";
import { Box, BoxComponent, BoxProps } from "../Box";

export type ButtonVariant = "primary" | "default" | "text";

export type ButtonProps<E extends React.ElementType = React.ElementType> = {
  variant?: ButtonVariant;
} & BoxProps<E>;

const COLOR_MAP: Record<ButtonVariant, string> = {
  default: "border-gray-700",
  text: "border-transparent",
  primary:
    "border-primary-700 text-primary-700 hover:bg-primary-700 hover:bg-opacity-20 focus focus:bg-opacity-40",
};

export const Button: BoxComponent<ButtonProps> = forwardRef(function Button(
  { as, className = "", variant = "default", ...rest },
  ref,
) {
  return (
    <Box
      as={as ?? "button"}
      className={`select-none text-sm px-4 py-2 focus:outline-none rounded font-bold border border-gray-700 ${COLOR_MAP[variant]} ${className}`}
      ref={ref}
      {...rest}
    />
  );
});
