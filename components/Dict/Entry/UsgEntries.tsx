import type { UsgModel } from "@services/VocabularyService";
import React from "react";
import { Usg } from "../Elements";
import { joinBy } from "../helper";

type UsgEntriesProps = {
  usg: UsgModel[];
};

export function UsgEntries({ usg }: UsgEntriesProps): JSX.Element | null {
  return (
    <>
      {usg
        .map((usg, index) => <Usg key={index} {...usg} />)
        .reduce(joinBy(" "), [])}{" "}
    </>
  );
}
