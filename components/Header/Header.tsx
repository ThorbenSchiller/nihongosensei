import React from "react";
import { Search } from "../Search";
import { Link } from "../Link";
import RouterLink from "next/link";
import { Logo } from "../Logo";
import clsx from "clsx";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps): JSX.Element {
  return (
    <header className={clsx("relative flex", className)}>
      <RouterLink href="/" passHref={true}>
        <Link color="text" className=" p-3 flex items-center">
          <Logo />
        </Link>
      </RouterLink>
      <Search className="mx-auto p-3 flex-grow" />
    </header>
  );
}
