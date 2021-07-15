import React, { forwardRef, HTMLProps } from "react";

export const Link = forwardRef<HTMLAnchorElement, HTMLProps<HTMLAnchorElement>>(
  function Link({ className = "", ...rest }, ref): JSX.Element {
    return <a className={`hover:underline ${className}`} ref={ref} {...rest} />;
  }
);
