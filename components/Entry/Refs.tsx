import { RefModel, RefTypeEnum } from "../../services/VocabularyService";
import React from "react";
import { Ref } from "./Ref";

type RefsProps = {
  refs: RefModel[];
  className?: string;
  component?: "div" | "span";
};

const IGNORED_TYPES: RefTypeEnum[] = ["MAIN"];

export function Refs({
  refs,
  className = "",
  component = "div",
}: RefsProps): JSX.Element | null {
  const relevantRefs = refs.filter(({ type }) => !IGNORED_TYPES.includes(type));

  if (!relevantRefs.length) {
    return null;
  }

  const children = relevantRefs.map((ref, index) => (
    <Ref
      key={ref.id}
      className={index != refs.length - 1 ? "mr-2" : undefined}
      {...ref}
    />
  ));

  return React.createElement(
    component,
    {
      className,
    },
    children
  );
}
