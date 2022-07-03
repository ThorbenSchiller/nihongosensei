import clsx from "clsx";
import { useRouter } from "next/router";
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
        router.push({
          query: {
            ...router.query,
            offset: selected * limit,
            limit,
          },
        });
      },
      [router, limit]
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
      activeClassName="text-primary-500 bold"
      containerClassName={clsx("flex justify-center items-center", className)}
      pageClassName=""
      pageLinkClassName="inline-flex px-3 py-1"
      previousLinkClassName="inline-flex px-3 py-1"
      nextLinkClassName="inline-flex px-3 py-1"
      disabledClassName="opacity-50 pointer-events-none"
      breakClassName="opacity-50 pointer-events-none"
    />
  );
}
