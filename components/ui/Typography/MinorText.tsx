import clsx from "clsx";
import React, { HTMLProps, ReactNode } from "react";

export type MinorTextProps = HTMLProps<HTMLSpanElement> & {
  component?: keyof JSX.IntrinsicElements;
  children?: ReactNode | ReactNode[];
};

export function MinorText({
  className,
  component = "span",
  ...rest
}: MinorTextProps): JSX.Element {
  return React.createElement(component, {
    className: clsx("text-gray-700 dark:text-gray-300", className),
    ...rest,
  });
}
