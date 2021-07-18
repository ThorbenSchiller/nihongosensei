import React from "react";
import { Search } from "../Search";
import { Link } from "../Link";
import RouterLink from "next/link";
import { Logo } from "../Logo";

export function Header(): JSX.Element {
  return (
    <header className="relative">
      <RouterLink href="/" passHref={true}>
        <Link
          color="text"
          className="absolute left-0 top-0 bottom-0 p-3 flex items-center"
        >
          <Logo />
        </Link>
      </RouterLink>
      <Search className="mx-auto p-3" style={{ maxWidth: 400 }} />
    </header>
  );
}
