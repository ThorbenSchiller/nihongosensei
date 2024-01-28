import clsx from "clsx";
import { useRouter } from "next/router";
import type { JSX } from "react";
import { useCallback } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

type PaginationProps = {
  offset: number;
  limit: number;
  count: number;
  className?: string;
};

export function Pagination({
  limit,
  count,
  offset,
  className,
}: PaginationProps): JSX.Element {
  const router = useRouter();
  const currentPage = offset / limit;
  const pageCount = Math.ceil(count / limit);
  const handlePageChange: NonNullable<ReactPaginateProps["onPageChange"]> =
    useCallback(
      ({ selected }) => {
        router
          .push({
            query: {
              ...router.query,
              offset: selected * limit,
              limit,
            },
          })
          .catch(console.error);
      },
      [router, limit],
    );

  return (
    <ReactPaginate
      disableInitialCallback={true}
      previousLabel="«"
      nextLabel="»"
      breakLabel="..."
      pageCount={pageCount}
      forcePage={currentPage}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      onPageChange={handlePageChange}
      activeLinkClassName="font-bold"
      containerClassName={clsx("flex justify-center items-center", className)}
      pageClassName=""
      pageLinkClassName="inline-flex px-3 py-1 underline underline-offset-4 text-primary-700 dark:text-primary-300"
      previousLinkClassName="inline-flex px-3 py-1 underline underline-offset-4 text-primary-700 dark:text-primary-300"
      nextLinkClassName="inline-flex px-3 py-1 underline underline-offset-4 text-primary-700 dark:text-primary-300"
      disabledClassName="opacity-50 pointer-events-none"
      breakClassName="opacity-50 pointer-events-none"
    />
  );
}
