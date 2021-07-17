import React from "react";
import { BracketModel } from "../../services/VocabularyService";
import { mapElement } from "./mapElement";
import { isDefined } from "./guards";

export function Bracket({
  defAndExplAndBirthdeath,
}: BracketModel): JSX.Element {
  return (
    <>{defAndExplAndBirthdeath.map(mapElement).flat().filter(isDefined)}</>
  );
}
