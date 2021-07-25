import { cloneElement } from "react";

export function setKeyProperty(
  keyRetriever: (index: number) => string = (index) => index.toString()
): (element: JSX.Element, index: number) => JSX.Element {
  return (element, index) =>
    cloneElement(element, {
      key: keyRetriever(index),
    });
}
