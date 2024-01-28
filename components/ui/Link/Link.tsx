import clsx from "clsx";
import RouterLink, { LinkProps as RouterLinkProps } from "next/link";
import React, { forwardRef } from "react";

const COLOR_MAP = {
  primary:
    "underline underline-offset-4 text-primary-700 dark:text-primary-300",
  text: "underline underline-offset-4",
  plain: "",
};

export type LinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof RouterLinkProps
> &
  RouterLinkProps & {
    color?: keyof typeof COLOR_MAP;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, color = "primary", ...rest },
  ref,
): JSX.Element {
  return (
    <RouterLink
      className={clsx(COLOR_MAP[color], className)}
      ref={ref}
      {...rest}
    />
  );
});
