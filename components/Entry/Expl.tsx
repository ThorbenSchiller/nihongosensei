import React from "react";
import { ExplModel } from "../../services/VocabularyService";
import { createElements } from "./createElements";

export function Expl({ textAndLiteralAndTransl }: ExplModel): JSX.Element {
  return <>{createElements(textAndLiteralAndTransl)}</>;
}