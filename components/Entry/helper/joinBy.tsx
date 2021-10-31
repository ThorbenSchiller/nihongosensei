import React, { Fragment } from "react";

/**
 * Returns a function which joins elements with the given glue.
 * This functions is indented to be used in {@link Array#reduce}.
 *
 * @param glue The glue to use.
 */
export function joinBy(glue: string) {
  return function joinedBy(
    prev: JSX.Element[],
    curr: JSX.Element | null,
    index: number
  ): JSX.Element[] {
    if (!curr) {
      return prev;
    }

    if (!prev.length) {
      return [curr];
    }

    return [...prev, <Fragment key={`glue-${index}`}>{glue}</Fragment>, curr];
  };
}
