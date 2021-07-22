import React, { Fragment } from "react";

export function joinBy(glue: string) {
  return (
    prev: JSX.Element[],
    curr: JSX.Element | null,
    index: number
  ): JSX.Element[] => {
    if (!curr) {
      return prev;
    }

    if (!prev.length) {
      return [curr];
    }

    return [...prev, <Fragment key={`glue-${index}`}>{glue}</Fragment>, curr];
  };
}
