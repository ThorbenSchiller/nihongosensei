import clsx from "clsx";
import { Link } from "../Link";
import { Logo } from "../Logo";
import { Search } from "../Search";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps): JSX.Element {
  return (
    <header className={clsx("relative flex", className)}>
      <Link href="/" color="text" className="flex items-center mr-8">
        <Logo className="shrink-0" />
      </Link>
      <Search className="mx-auto flex-grow" />
    </header>
  );
}
