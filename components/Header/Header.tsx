import clsx from "clsx";
import RouterLink from "next/link";
import React from "react";
import { Link } from "../Link";
import { Logo } from "../Logo";
import { Search } from "../Search";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps): JSX.Element {
  return (
    <header className={clsx("relative flex", className)}>
      <RouterLink href="/" passHref={true}>
        <Link color="text" className="flex items-center mr-8">
          <Logo />
        </Link>
      </RouterLink>
      <Search className="mx-auto flex-grow" />
    </header>
  );
}
