import React from "react";
import clsx from "clsx";
import Link from "next/link";

type JlptBadgeProps = {
  level: number;
  className?: string;
};

export function JlptBadge({ level, className }: JlptBadgeProps): JSX.Element {
  return (
    <Link href={`/jlpt/${level}`} passHref={true}>
      <a
        href="#"
        color="text"
        className={clsx(
          "inline-block text-sm px-1 border rounded border-primary-700 dark:border-primary-300 text-primary-700 dark:text-primary-300",
          className
        )}
      >
        JLPT N{level}
      </a>
    </Link>
  );
}
