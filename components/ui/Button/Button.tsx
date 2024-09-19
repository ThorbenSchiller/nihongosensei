import { ButtonHTMLAttributes, forwardRef, HTMLProps } from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "default" | "text";

export type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const COLOR_MAP: Record<ButtonVariant, string> = {
  default: "border-gray-700",
  text: "border-transparent",
  primary:
    "border-primary-700 text-primary-700 hover:bg-primary-700 hover:bg-opacity-20 focus focus:bg-opacity-40",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className = "", variant = "default", ...rest }, ref) {
    return (
      <button
        className={clsx(
          "select-none text-sm px-4 py-2 focus:outline-none rounded font-bold border border-gray-700",
          COLOR_MAP[variant],
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);

export type ButtonLinkProps = {
  variant?: ButtonVariant;
} & HTMLProps<HTMLAnchorElement>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function Button({ className = "", variant = "default", ...rest }, ref) {
    return (
      <a
        className={clsx(
          "select-none text-sm px-4 py-2 focus:outline-none rounded font-bold border border-gray-700",
          COLOR_MAP[variant],
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);
