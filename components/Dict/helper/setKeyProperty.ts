import { cloneElement } from "react";

type KeyRetriever = (index: number) => string;

const DEFAULT_KET_RETRIEVER: KeyRetriever = (index) => index.toString();

/**
 * Sets the `key` property for the given element.
 *
 * @param keyRetriever The key retriever to use. By default, the index is used.
 */
export function setKeyProperty(
  keyRetriever: KeyRetriever = DEFAULT_KET_RETRIEVER
): (element: JSX.Element, index: number) => JSX.Element {
  return (element, index) =>
    cloneElement(element, {
      key: keyRetriever(index),
    });
}
