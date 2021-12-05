import clsx from "clsx";
import React, { HTMLProps } from "react";

export type LogoProps = {
  text?: string | null;
  size?: keyof typeof SIZE_MAP;
} & Omit<HTMLProps<HTMLSpanElement>, "size">;

const SIZE_MAP = {
  normal: "text-xl",
  big: "text-4xl",
};

export function Logo({
  className,
  text = null,
  size = "normal",
  ...rest
}: LogoProps): JSX.Element {
  return (
    <span className={clsx(SIZE_MAP[size], className)} {...rest}>
      <span lang="ja" className="font-serif">
        日本語先生
      </span>
      {text && <> {text}</>}
    </span>
  );
}
