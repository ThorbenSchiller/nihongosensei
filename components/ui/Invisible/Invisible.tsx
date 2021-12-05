import React, { HTMLProps, memo } from "react";

export type InvisibleProps = HTMLProps<HTMLSpanElement>;

function Invisible({ children, className = "", ...rest }: InvisibleProps) {
  return (
    <span className={`invisible ${className}`} {...rest}>
      {children}
    </span>
  );
}

export default memo(Invisible);
