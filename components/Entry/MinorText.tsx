import React, { HTMLProps } from "react";

export type MinorTextProps = HTMLProps<HTMLSpanElement> & {
  component?: "div" | "span" | "p" | "i";
};

export function MinorText({
  className = "",
  component = "span",
  ...rest
}: MinorTextProps): JSX.Element {
  return React.createElement(component, {
    className: `text-gray-700 dark:text-gray-300 ${className}`,
    ...rest,
  });
}
