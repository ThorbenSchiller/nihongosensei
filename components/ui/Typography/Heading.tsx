import clsx from "clsx";
import type { ElementType, ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = {
  level?: HeadingLevel;
  className?: string;
  children: ReactNode | ReactNode[];
};

const LEVEL_CLASS_MAP: Record<HeadingLevel, string | undefined> = {
  "1": undefined,
  "2": "text-2xl",
  "3": "text-xl",
  "4": "text-lg",
  "5": undefined,
  "6": undefined,
};

const LEVEL_COMPONENT_MAP: Record<HeadingLevel, ElementType> = {
  "1": "h1",
  "2": "h2",
  "3": "h3",
  "4": "h4",
  "5": "h5",
  "6": "h6",
};

export function Heading({ level = 1, className, ...rest }: HeadingProps) {
  const Component = LEVEL_COMPONENT_MAP[level];
  if (!Component) {
    return null;
  }

  return (
    <Component className={clsx(LEVEL_CLASS_MAP[level], className)} {...rest} />
  );
}
