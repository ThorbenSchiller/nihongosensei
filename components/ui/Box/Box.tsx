import React, { createElement, forwardRef } from "react";

export type BoxProps<E extends React.ElementType = any> = {
  as?: E;
} & React.ComponentPropsWithRef<E>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type BoxComponent<P = {}> = <E extends React.ElementType>(
  props: P & BoxProps<E>
) => JSX.Element | null;

export const Box = forwardRef(function Box<
  E extends React.ElementType = React.ElementType
>({ as, ...rest }: BoxProps<E>, ref: React.Ref<unknown> | undefined) {
  return createElement(as ?? "span", {
    ...rest,
    ref,
  });
});
