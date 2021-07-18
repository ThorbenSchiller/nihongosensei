import RouterLink from "next/link";
import { Link } from "../Link";
import React from "react";
import { useRouter } from "next/router";

type SimplePaginationProps = {
  offset: number;
  limit: number;
};

export function SimplePagination({
  offset,
  limit,
}: SimplePaginationProps): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      {offset != 0 ? (
        <RouterLink
          href={{
            query: {
              ...router.query,
              offset: offset - limit,
            },
          }}
          passHref={true}
        >
          <Link>previous</Link>
        </RouterLink>
      ) : (
        <>&nbsp;</>
      )}
      <RouterLink
        href={{
          query: {
            ...router.query,
            offset: offset + limit,
          },
        }}
        passHref={true}
      >
        <Link>next</Link>
      </RouterLink>
    </div>
  );
}
