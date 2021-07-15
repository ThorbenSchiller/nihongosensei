import React, { HTMLProps } from "react";

export function MinorText({
  className = "",
  ...rest
}: HTMLProps<HTMLSpanElement>): JSX.Element {
  return (
    <span
      className={`text-gray-700 dark:text-gray-300 ${className}`}
      {...rest}
    />
  );
}
