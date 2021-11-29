import React from "react";
import type { BracketModel } from "../../services/VocabularyService";
import { createElements } from "./createElements";

export function Bracket({
  defAndExplAndBirthdeath,
}: BracketModel): JSX.Element {
  // Bracket only contains expl for now, search for example with non expl elements?
  return <>{createElements(defAndExplAndBirthdeath)}</>;
}
