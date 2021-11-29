import React from "react";
import type { UsgModel } from "../../services/VocabularyService";
import { joinBy } from "./helper";
import { Usg } from "./Usg";

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
