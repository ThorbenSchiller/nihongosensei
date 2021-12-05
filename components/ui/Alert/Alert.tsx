import clsx from "clsx";
import React, { HTMLProps } from "react";

type AlertType = "warning" | "error" | "info";

export type AlertProps = {
  type?: AlertType;
} & HTMLProps<HTMLDivElement>;

const TYPE_STYLE_MAP: Record<AlertType, string> = {
  error:
    "bg-red-500 bg-opacity-10 dark:bg-opacity-10 text-red-700 dark:text-red-300",
  info: "bg-blue-500 bg-opacity-10 dark:bg-opacity-10 text-blue-700 dark:text-blue-300",
  warning: "",
};

export function Alert({
  type = "info",
  children,
  className,
  ...rest
}: AlertProps): JSX.Element {
  return (
    <div
      className={clsx("text-sm p-3", TYPE_STYLE_MAP[type], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
