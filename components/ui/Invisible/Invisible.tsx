import clsx from "clsx";
import React, { HTMLProps } from "react";

export type InvisibleProps = HTMLProps<HTMLSpanElement>;

export function Invisible({
  children,
  className = "",
  ...rest
}: InvisibleProps) {
  return (
    <span
      data-testid="invisible"
      className={clsx("invisible", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
